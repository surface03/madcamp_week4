import re
import json
import os
import platform
import sys
import humanize
import numpy as np
import shutil
from datetime import datetime
from importlib import reload
from pathlib import Path
from dataclasses import dataclass, field
import typer
from bs4 import BeautifulSoup
from loguru import logger
from rich import pretty
from tqdm import tqdm
from typing import List, Collection, Any
import time
import requests
import pandas as pd


def remove_dir_if_exists(dir_name: Path) -> None:
    if os.path.exists(dir_name):
        logger.debug(f"Directory {dir_name.resolve()} exists, deleting")
        shutil.rmtree(dir_name)


def remove_file_if_exists(file_name: Path) -> None:
    if os.path.exists(file_name):
        logger.debug(f"File {file_name} exists, deleting")
        os.remove(file_name)


def json_read_by_path(file_name: Path) -> dict[Any, Any]:
    assert file_name.is_file()
    logger.debug(f"Reading json file {file_name.resolve()}...")
    with open(file_name, mode="r", encoding="utf-8") as f:
        res_dict: dict[Any, Any] = json.load(f)
    return res_dict


def json_write_by_path(file_name: Path, obj_to_write: Any):
    remove_file_if_exists(file_name)
    with open(file_name, mode="w", encoding="utf-8") as f:
        json.dump(obj_to_write, f, ensure_ascii=False, indent=2)
    logger.debug(f"Json {file_name} written")


def str_read_by_path(file_name: Path) -> str:
    assert file_name.is_file()
    logger.debug(f"Reading file {file_name.resolve()}...")
    res_str = file_name.read_text(encoding="utf-8")
    return res_str


def str_write_by_path(file_name: Path, content_to_write: str) -> None:
    remove_file_if_exists(file_name)
    file_name.write_text(content_to_write, encoding="utf-8")
    logger.debug(f"File {file_name} written")


def assert_dir_count(dir_name: Path, pattern: str, expected_count: int) -> None:
    file_name_list = list(dir_name.rglob(pattern))
    file_name_list.sort()
    assert len(file_name_list) == expected_count, f"In {dir_name}, {expected_count} files expected, found {len(file_name_list)}"
    logger.debug(f"{dir_name} has {expected_count} files")


def get_html_by_request(url: str) -> str:
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    for _i in range(5):
        try:
            req_get = requests.get(url=url, timeout=10, headers={"User-Agent": user_agent}, verify=True)
            html = req_get.text
            return html
        except Exception as e:
            logger.warning(f"In request, {_i + 1}th try, error {repr(e)} while crawling {url}")
            time.sleep(0.5)
            continue
    logger.error(f"In request, failed to crawl {url}")
    raise RuntimeError(f"Failed Request")
