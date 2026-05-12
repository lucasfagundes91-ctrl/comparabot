"""
database.py
===========
Conexão com PostgreSQL e controle de uso por usuário.
"""

import os
import psycopg2
from datetime import datetime
from contextlib import contextmanager

DATABASE_URL = os.environ["DATABASE_URL"]
LIMITE_FREE = 3


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
