#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Affiche une arborescence filtrée du projet.

- **Par défaut** : seuls les *documents utiles* + les fichiers *source Python*
  sont affichés.  
- Avec le flag ``--all`` on retrouve **tout** (code, images, archives,
  virtual‑env, …).  
- Le dossier ``venv`` (ou ``.venv``) ainsi que le sous‑dossier
  ``site-packages`` sont **exclus** automatiquement même avec ``--all``,
  puisqu’ils ne font pas partie du projet métier.

Usage :
    python create_arbre_projet.py                 # → docs + *.py
    python create_arbre_projet.py --all            # → tout (sans le venv)
    python create_arbre_projet.py /chemin         # → docs + *.py dans /chemin
    python create_arbre_projet.py /chemin --all
"""

import argparse
import sys
from pathlib import Path
from typing import Set

# ----------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------
def _human_readable(num_bytes: int) -> str:
    """Convertit un nombre d’octets en chaîne lisible (B, KB, MB, GB)."""
    if num_bytes < 1024:
        return f"{num_bytes} B"
    if num_bytes < 1024 ** 2:
        return f"{num_bytes / 1024:.1f} KB"
    if num_bytes < 1024 ** 3:
        return f"{num_bytes / 1024 ** 2:.1f} MB"
    return f"{num_bytes / 1024 ** 3:.1f} GB"


# ----------------------------------------------------------------------
# Extensions
# ----------------------------------------------------------------------
# 1️⃣ Extensions obligatoires (toujours affichées)
CORE_EXT: Set[str] = {
    ".py", ".ipynb",            # code source
    ".md", ".txt", ".pdf", ".docx", ".xlsx", ".pptx", ".json", ".csv", ".tsv",
    ".yaml", ".yml", ".toml",   # data / config
}

# 2️⃣ Extensions « tout » (supplémentaires – images, archives, etc.)
ALL_EXT: Set[str] = {
    # Styles / markup
    ".html", ".htm", ".css", ".scss", ".sass", ".less",
    # Images & icônes
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
    # Archives
    ".zip", ".tar", ".gz", ".tgz", ".bz2",
    # Divers
    ".log", ".env",
    # Le reste du set précédent (pour éviter la double‑définition)
    *CORE_EXT,
}

# ----------------------------------------------------------------------
# Dossiers à ignorer – même en mode ``--all``
# ----------------------------------------------------------------------
IGNORE_DIRS: Set[str] = {
    "__pycache__",
    ".venv", "venv",               # virtual‑env (peu importe le préfixe)
    ".git",
    ".idea",
    ".vscode",
    ".pytest_cache",
    "node_modules",
    "dist",
    "build",
    ".egg-info",
    ".mypy_cache",
    "__pypackages__",
    ".DS_Store",
    "site-packages",               # sous‑dossier interne du venv
    "__pycache__",                # (au cas où)
}

# ----------------------------------------------------------------------
# Fonction principale d’affichage
# ----------------------------------------------------------------------
def _print_tree(root: Path, allowed_ext: Set[str], prefix: str = "") -> None:
    """
    Parcourt ``root`` et imprime chaque sous‑répertoire ou fichier
    autorisé par ``allowed_ext``.
    """
    # Trie alphanumérique – dossiers d’abord
    entries = sorted(
        root.iterdir(),
        key=lambda p: (p.is_file(), p.name.lower())
    )

    visible = []
    for entry in entries:
        if entry.is_dir():
            # Ignorer les dossiers figés
            if entry.name in IGNORE_DIRS or entry.name.startswith('.'):
                continue
            visible.append(entry)
        else:
            # Le fichier est affiché s’il possède une extension autorisée
            if entry.suffix.lower() in allowed_ext:
                visible.append(entry)

    for idx, entry in enumerate(visible):
        is_last = idx == len(visible) - 1
        branch = "└── " if is_last else "├── "

        if entry.is_dir():
            print(f"{prefix}{branch}{entry.name}/")
            extension = "    " if is_last else "│   "
            _print_tree(entry, allowed_ext, prefix + extension)
        else:
            size = _human_readable(entry.stat().st_size)
            print(f"{prefix}{branch}{entry.name}  ({size})")


# ----------------------------------------------------------------------
# Entrée du script
# ----------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Affiche l’arborescence du projet en filtrant les fichiers. "
            "Par défaut, seuls les documents utiles + les fichiers Python sont listés."
        ),
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "path",
        nargs="?",
        default=None,
        help=("Chemin du répertoire à analyser (par défaut : dossier du script)."),
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help=(
            "Afficher **tout** le contenu (images, archives, …). "
            "Les dossiers « venv », « site‑packages » restent exclus car ils ne font "
            "pas partie du code métier."
        ),
    )
    args = parser.parse_args()

    # ------------------------------------------------------------------
    # 1️⃣ Chemin racine à explorer
    # ------------------------------------------------------------------
    if args.path:
        root_path = Path(args.path).expanduser().resolve()
        if not root_path.is_dir():
            print(f"❌  Le chemin fourni n’est pas un répertoire : {root_path}")
            sys.exit(1)
    else:
        root_path = Path(__file__).resolve().parent

    # ------------------------------------------------------------------
    # 2️⃣ Jeu d’extensions à retenir
    # ------------------------------------------------------------------
    allowed_ext = ALL_EXT if args.all else CORE_EXT

    # ------------------------------------------------------------------
    # 3️⃣ Affichage de l’arborescence
    # ------------------------------------------------------------------
    print(f"{root_path.name}/")
    _print_tree(root_path, allowed_ext, prefix="")

if __name__ == "__main__":
    main()
