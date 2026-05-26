#!/usr/bin/env bash
# =============================================================
# deploy.sh — Build Astro et met à jour la branche deploy
# Usage : npm run deploy
# =============================================================
set -euo pipefail

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${BLUE}▶${NC} $1"; }
ok()   { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; exit 1; }

# ── 1. Vérifications préalables ────────────────────────────
log "Vérification de l'état git..."

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  fail "Vous devez être sur la branche 'main' pour déployer. (branche actuelle : $CURRENT_BRANCH)"
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "Des modifications non committées existent. Committez d'abord vos changements."
fi

ok "Branche main, working tree propre"

# ── 2. Build Astro ─────────────────────────────────────────
log "Build Astro en cours..."
# Résoudre le chemin du projet (répertoire parent de scripts/)
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
"$PROJECT_DIR/node_modules/.bin/astro" build --root "$PROJECT_DIR"
ok "Build terminé → dist/"

# ── 3. Mise à jour de la branche deploy via worktree ───────
WORK_DIR=$(mktemp -d)
log "Mise à jour de la branche deploy..."

# Ajouter le worktree pour la branche deploy
git worktree add "$WORK_DIR" deploy 2>/dev/null || {
  # Si le worktree existe déjà, on le supprime et on réessaie
  git worktree remove "$WORK_DIR" --force 2>/dev/null || true
  rm -rf "$WORK_DIR"
  WORK_DIR=$(mktemp -d)
  git worktree add "$WORK_DIR" deploy
}

# Nettoyer le worktree (sauf .git)
find "$WORK_DIR" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copier le contenu de dist/
cp -r dist/. "$WORK_DIR/"

# Ajouter un .gitignore minimal
printf '.DS_Store\n' > "$WORK_DIR/.gitignore"

# ── 4. Commit ──────────────────────────────────────────────
cd "$WORK_DIR"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  warn "Aucun changement détecté — deploy déjà à jour."
else
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
  git add --all
  git commit -m "deploy: build $TIMESTAMP"
  ok "Commit créé : deploy build $TIMESTAMP"
fi

# ── 5. Push ────────────────────────────────────────────────
log "Push de la branche deploy..."
git push origin deploy
ok "Branche deploy mise à jour sur GitHub"

# ── 6. Nettoyage ───────────────────────────────────────────
cd - > /dev/null
git worktree remove "$WORK_DIR" --force
rm -rf "$WORK_DIR"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ Déploiement terminé !${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  Repo   : https://github.com/NicoF213/elysium-scale/tree/deploy"
echo -e "  Branch : deploy (fichiers HTML/CSS/JS prêts à servir)"
echo ""
