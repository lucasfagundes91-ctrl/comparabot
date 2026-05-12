"""
main.py
=======
FastAPI + Twilio webhook para o bot de comparação de orçamentos.
Deploy: Railway (Python, porta via $PORT)
"""

import os
from fastapi import FastAPI, Request, Response
from twilio.rest import Client as TwilioClient

import database as db
import comparador_orcamentos as bot

app = FastAPI(title="ComparaBot WhatsApp")

twilio       = TwilioClient(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"])
NUMERO_FROM  = os.environ["TWILIO_WHATSAPP_NUMBER"]


@app.on_event("startup")
def startup():
    db.init_db()
    print("✅ DB inicializado")


@app.get("/")
def health():
    return {"status": "ok", "app": "ComparaBot"}


@app.post("/webhook/whatsapp")
async def webhook(request: Request):
    form       = await request.form()
    phone      = form.get("From", "")
    body       = form.get("Body", "")
    num_media  = int(form.get("NumMedia", 0))
    media_url  = form.get("MediaUrl0")  if num_media > 0 else None
    media_type = form.get("MediaContentType0") if num_media > 0 else None

    resposta = bot.handle(
        phone=phone,
        body=body,
        media_url=media_url,
        media_type=media_type,
        num_media=num_media,
    )

    if resposta:
        _enviar(phone, resposta)

    return Response(content="<Response/>", media_type="text/xml")


@app.post("/admin/ativar-pago")
async def ativar_pago(request: Request):
    data   = await request.json()
    secret = os.environ.get("ADMIN_SECRET", "")
    if data.get("secret") != secret:
        return {"error": "não autorizado"}, 403

    phone = data.get("phone", "").replace("whatsapp:", "").strip()
    if not phone:
        return {"error": "phone obrigatório"}

    db.ativar_plano_pago(phone)
    return {"ok": True, "phone": phone, "plano": "pago"}


def _enviar(to: str, msg: str):
    if not to.startswith("whatsapp:"):
        to = f"whatsapp:{to}"
    for bloco in _dividir(msg, 1500):
        twilio.messages.create(from_=NUMERO_FROM, to=to, body=bloco)


def _dividir(texto: str, limite: int) -> list[str]:
    if len(texto) <= limite:
        return [texto]
    blocos, atual = [], ""
    for linha in texto.split("\n"):
        if len(atual) + len(linha) + 1 > limite:
            blocos.append(atual.strip())
            atual = linha
        else:
            atual += ("\n" if atual else "") + linha
    if atual:
        blocos.append(atual.strip())
    return blocos
