"""
database.py
===========
Conexão com PostgreSQL e controle de uso por usuário.
"""

import os
import psycopg2
from psycopg2.extras import Json
from datetime import datetime
from contextlib import contextmanager

DATABASE_URL = os.environ["DATABASE_URL"]
LIMITE_FREE = 3
SESSION_TTL_MIN = 60


@contextmanager
def get_conn():
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS usuarios_bot (
                    phone     TEXT PRIMARY KEY,
                    plano     TEXT NOT NULL DEFAULT 'free',
                    criado_em TIMESTAMP DEFAULT NOW()
                );
                CREATE TABLE IF NOT EXISTS uso_mensal (
                    phone       TEXT NOT NULL,
                    mes_ref     TEXT NOT NULL,
                    comparacoes INT  NOT NULL DEFAULT 0,
                    PRIMARY KEY (phone, mes_ref)
                );
                CREATE TABLE IF NOT EXISTS sessoes (
                    phone      TEXT PRIMARY KEY,
                    state      TEXT  NOT NULL DEFAULT 'idle',
                    orcamentos JSONB NOT NULL DEFAULT '[]',
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
                );
            """)


def _mes_ref():
    return datetime.now().strftime("%Y-%m")


def get_plano(phone):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT plano FROM usuarios_bot WHERE phone = %s", (phone,))
            row = cur.fetchone()
            if not row:
                cur.execute("INSERT INTO usuarios_bot (phone) VALUES (%s) ON CONFLICT DO NOTHING", (phone,))
                return "free"
            return row[0]


def get_comparacoes_mes(phone):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT comparacoes FROM uso_mensal WHERE phone = %s AND mes_ref = %s", (phone, _mes_ref()))
            row = cur.fetchone()
            return row[0] if row else 0


def incrementar_comparacao(phone):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO uso_mensal (phone, mes_ref, comparacoes) VALUES (%s, %s, 1)
                ON CONFLICT (phone, mes_ref) DO UPDATE SET comparacoes = uso_mensal.comparacoes + 1
            """, (phone, _mes_ref()))


def pode_comparar(phone):
    plano = get_plano(phone)
    if plano == "pago":
        return True, 0, 999
    usadas = get_comparacoes_mes(phone)
    return usadas < LIMITE_FREE, usadas, LIMITE_FREE


def ativar_plano_pago(phone):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO usuarios_bot (phone, plano) VALUES (%s, 'pago')
                ON CONFLICT (phone) DO UPDATE SET plano = 'pago'
            """, (phone,))


# ── Sessões (persistidas: sobrevivem a restart/redeploy do Railway) ──

def get_sessao(phone):
    """Retorna a sessão do telefone, ou None se inexistente/expirada.
    Purga sessões vencidas (TTL) na mesma chamada."""
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM sessoes WHERE updated_at < NOW() - INTERVAL '%s minutes'",
                (SESSION_TTL_MIN,),
            )
            cur.execute("SELECT state, orcamentos FROM sessoes WHERE phone = %s", (phone,))
            row = cur.fetchone()
            if not row:
                return None
            return {"state": row[0], "orcamentos": row[1]}


def salvar_sessao(phone, state, orcamentos):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO sessoes (phone, state, orcamentos, updated_at)
                VALUES (%s, %s, %s, NOW())
                ON CONFLICT (phone) DO UPDATE
                    SET state = EXCLUDED.state,
                        orcamentos = EXCLUDED.orcamentos,
                        updated_at = NOW()
            """, (phone, state, Json(orcamentos)))


def deletar_sessao(phone):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM sessoes WHERE phone = %s", (phone,))
