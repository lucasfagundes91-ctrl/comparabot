#!/usr/bin/env bash
# setup_git.sh — chamado via AppleScript (do shell script).
# Faz: copia files pra ~/comparabot-tmp, git init+commit, gh repo create+push,
# move .git de volta pra iCloud, loga tudo em setup_result.log.

PROJECT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Scripts/comparabot"
LOG="$PROJECT/setup_result.log"
TMP="$HOME/comparabot-tmp"

# Tudo (stdout+stderr) vai pro log e pro stdout
exec > >(tee "$LOG") 2>&1

echo "===== ComparaBot setup ====="
date
echo "USER=$(whoami)  HOME=$HOME"

# Carrega PATH do login shell
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
[ -f "$HOME/.zprofile" ] && . "$HOME/.zprofile" >/dev/null 2>&1 || true
[ -f "$HOME/.zshrc"    ] && . "$HOME/.zshrc"    >/dev/null 2>&1 || true
echo "PATH=$PATH"

GH="$(command -v gh || true)"
[ -z "$GH" ] && [ -x /opt/homebrew/bin/gh ] && GH=/opt/homebrew/bin/gh
[ -z "$GH" ] && [ -x /usr/local/bin/gh ]    && GH=/usr/local/bin/gh
echo "GH=$GH"

GIT="$(command -v git || echo /usr/bin/git)"
echo "GIT=$GIT"

if [ -z "$GH" ]; then
  echo "FATAL: gh CLI not found"
  echo "STATUS=FAIL_NO_GH"
  exit 10
fi

"$GH" --version | head -1
echo "--- gh auth status ---"
"$GH" auth status 2>&1 | head -30 || true

ACTIVE_USER="$("$GH" api user --jq .login 2>&1)"
echo "ACTIVE_USER=$ACTIVE_USER"
if [ "$ACTIVE_USER" != "lucasfagundes91-ctrl" ]; then
  echo "ABORT: active gh user is '$ACTIVE_USER', expected 'lucasfagundes91-ctrl'"
  echo "STATUS=FAIL_WRONG_USER"
  exit 11
fi

# Prepara dir limpo fora do iCloud (evita os 'Operation not permitted' do iCloud)
rm -rf "$TMP"
mkdir -p "$TMP"

# Copia arquivos do projeto (sem .git, sem __pycache__, sem o próprio log)
( cd "$PROJECT" && find . -mindepth 1 -maxdepth 1 \
    ! -name '.git' ! -name '__pycache__' ! -name 'setup_result.log' \
    -exec cp -R {} "$TMP"/ \; )

ls -la "$TMP"

cd "$TMP"
"$GIT" init -b main
"$GIT" config user.email "lucasfagundes91@hotmail.com"
"$GIT" config user.name  "Lucas Fagundes"
"$GIT" add -A
"$GIT" commit -m "v1.0: estrutura inicial ComparaBot"
COMMIT_HASH="$("$GIT" rev-parse HEAD)"
echo "COMMIT_HASH=$COMMIT_HASH"

# Cria repo no GitHub e dá push
"$GH" repo create lucasfagundes91-ctrl/comparabot \
  --public --source=. --remote=origin --push --description "Bot WhatsApp de comparação de orçamentos com Claude Vision"

REPO_URL="$("$GH" repo view lucasfagundes91-ctrl/comparabot --json url --jq .url)"
echo "REPO_URL=$REPO_URL"

# Tenta mover o .git pra dentro do projeto no iCloud
echo "--- movendo .git pra iCloud ---"
if [ -d "$PROJECT/.git" ]; then rm -rf "$PROJECT/.git" 2>&1 || true; fi
if mv "$TMP/.git" "$PROJECT/.git" 2>&1; then
  echo "GIT_DIR_LOCATION=$PROJECT/.git"
  ICLOUD_OK=1
else
  echo "GIT_DIR_LOCATION=$TMP/.git (iCloud bloqueou move)"
  ICLOUD_OK=0
fi

echo "===== RESULTADO ====="
echo "STATUS=OK"
echo "COMMIT_HASH=$COMMIT_HASH"
echo "REPO_URL=$REPO_URL"
echo "PROJECT_PATH=$PROJECT"
echo "ICLOUD_GIT_OK=$ICLOUD_OK"
date
