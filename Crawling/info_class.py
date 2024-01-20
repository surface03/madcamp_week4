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


@dataclass(unsafe_hash=True)
class Info:
    uid: str                                        # unique id
    article_url: str                                # 기사 url
    title_text: str                                 # 기사 제목
    body_text: str                                  # 기사 내용
    thumbnail: str                                  # 썸네일 사진 링크
    article_date: str                               # 기사 날짜
    site_info: str                                  # 사이트 정보
    like_count: int                                 # 좋아요 수
    viewed_count: int                               # 조회수
    tags: List[str] = field(default_factory=list)   # 기타 태그들


def main() -> None:
    pass


if __name__ == "main":
    if hasattr(sys, "ps1"):
        pretty.install()
    else:
        with logger.catch():
            typer.run(main)
