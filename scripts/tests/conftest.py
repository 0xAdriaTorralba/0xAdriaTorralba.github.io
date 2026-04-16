"""Test harness for scripts/refresh_contributions.py.

Adds the scripts/ directory to sys.path so `from refresh_contributions import X`
works without installing the package. The module has no __init__.py on purpose
— it's a CLI, not a library — but it exposes clean functions we can test.
"""

from __future__ import annotations

import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SCRIPTS_DIR))

FIXTURES_DIR = Path(__file__).resolve().parent / "fixtures"
