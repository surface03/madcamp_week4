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
    assert d1.equals(d2), "Merged data and processed data is not equal"


def main() -> None:
    compare_df()


if __name__ == "__main__":
    if hasattr(sys, "ps1"):
        pretty.install()
    else:
        with logger.catch():
            typer.run(main)
