import dataclasses
import json
import random
import re
import os
import sys
from datetime import datetime
from importlib import reload
from pathlib import Path

import pandas as pd
import typer
from bs4 import BeautifulSoup
from loguru import logger
from rich import pretty
from tqdm import tqdm

import helper_function as hp
import info_class
import var_list as vl


def read_all_json(dir_name: Path) -> pd.DataFrame:
    file_list = list(dir_name.rglob("*.json"))
    dict_list = []
    single_file = random.choice(file_list)
    for single_file in file_list:
        d = hp.json_read_by_path(single_file)
        dict_list.append(d)
    pandas_d = pd.DataFrame(dict_list)
    assert pandas_d['uid'].is_unique, f"{Path} is not unique"
    return pandas_d


def merge_json() -> None:
    # 모든 json 파일들을 merge
    d1 = read_all_json(vl.TIME_CRAWLED_DIR)
    assert len(d1) == 224, f"d1 size is not 224, {len(d1)}"
    d3 = read_all_json(vl.NAVER_CRAWLED_DIR)
    assert len(d3) == 2130, f"d3 size is not 2130 {len(d3)}"
    total_d = pd.concat([d1, d3], ignore_index=True)

    assert total_d['uid'].is_unique, "total_d is not unique"
    assert len(total_d) == len(d1) + len(d3), "total_d size error"
    total_d.to_json(vl.MERGED_CRAWLED_JSONL, orient="records", lines=True, force_ascii=False)


def main() -> None:
    merge_json()


if __name__ == "__main__":
    if hasattr(sys, "ps1"):
        pretty.install()
    else:
        with logger.catch():
            typer.run(main)
