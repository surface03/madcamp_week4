import re
import os
import sys
from datetime import datetime
from importlib import reload
from pathlib import Path
from dataclasses import dataclass, field
import typer
from bs4 import BeautifulSoup
from loguru import logger
from rich import pretty
from tqdm import tqdm
from typing import List


CUR_DIR = Path("./").resolve()
CRAWLED_DIR = Path("./crawled").resolve()


TIMES_DIR = CRAWLED_DIR / "time"
TIMES_URLS_JSON = TIMES_DIR / "urls.json"
TIME_CRAWLED_DIR = TIMES_DIR / "data"


WASHINGTON_DIR = CRAWLED_DIR / "washington"
WASHINGTON_URLS_JSON = WASHINGTON_DIR / "urls.json"
WASHINGTON_CRAWLED_DIR = WASHINGTON_DIR / "data"


NAVER_DIR = CRAWLED_DIR / "naver"
NAVER_URLS_JSON = NAVER_DIR / "urls.json"
NAVER_CRAWLED_DIR = NAVER_DIR / "data"


MERGED_CRAWLED_JSONL = CRAWLED_DIR / "articles.jsonl"


def main() -> None:
    pass


if __name__ == "main":
    if hasattr(sys, "ps1"):
        pretty.install()
    else:
        with logger.catch():
            typer.run(main)
