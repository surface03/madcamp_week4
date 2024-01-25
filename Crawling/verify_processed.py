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


def read_sort_drop(file_path: Path) -> pd.DataFrame:
    df = pd.read_json(file_path, lines=True)

    df.sort_values(by='uid', inplace=True)

    df.drop(columns=['tags'], inplace=True)

    return df


def compare_df() -> None:
    d1 = read_sort_drop(vl.MERGED_CRAWLED_JSONL)
    d2 = read_sort_drop(vl.PROCESSED_CRAWLED_JSONL)
    # print(d1.iloc[222].to_dict())
    # print(d2.iloc[222].to_dict())
    # print(d2)
    nrows_d1 = d1.shape[0]
    nrows_d2 = d2.shape[0]
    if nrows_d1 != nrows_d2:
        logger.error("두 DataFrame의 행 수가 다릅니다.")
        sys.exit()

    for i in range(nrows_d1):
        logger.debug(f"{i}번째 행 비교...")
        row_d1 = d1.iloc[i]
        row_d2 = d2.iloc[i]

        # 행 비교
        if not row_d1.equals(row_d2):
            logger.error(f"인덱스 {i}에서 차이가 있습니다.")
            logger.error("d1의 행:")
            logger.error(row_d1)
            logger.error("d2의 행:")
            logger.error(row_d2)
            logger.error("---")
            sys.exit()
    # assert d1.equals(d2), "Merged data and processed data is not equal"


def main() -> None:
    compare_df()


if __name__ == "__main__":
    if hasattr(sys, "ps1"):
        pretty.install()
    else:
        with logger.catch():
            typer.run(main)
