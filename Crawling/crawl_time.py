import dataclasses
import json
import random
import re
import os
import sys
from datetime import datetime
from importlib import reload
from pathlib import Path
import typer
from bs4 import BeautifulSoup
from loguru import logger
from rich import pretty
from tqdm import tqdm
from dateutil.parser import parser

import helper_function as hp
import info_class
import var_list as vl


def gen_single_json(url: str, img: str, date: str, pan_id: int) -> None:
    html = hp.get_html_by_request(url)
    soup = BeautifulSoup(html, 'html.parser')
    get_title = soup.select("#article-header > header > div.mb-4.mt-2.lg\:mb-\[1\.4625rem\] > h1")
    title_str = ""
    for i in get_title:
        title_str = title_str + i.get_text()

    get_body = soup.select("#article-body-main > p")
    body_str = ""
    for i in get_body:
        body_str = body_str + i.get_text()

    info1 = info_class.Info(
        uid=str(pan_id),
        article_url=url,
        title_text=title_str,
        body_text=body_str,
        thumbnail=img,
        article_date=date,
        site_info="time",
        like_count=None,
        viewed_count=None,
        tags=[],
    )
    d1 = dataclasses.asdict(info1)

    fname = vl.TIME_CRAWLED_DIR / f"time_{pan_id}.json"
    hp.json_write_by_path(fname, d1)


def crawl_data() -> None:
    # https://time.com/section/world/?page={index} 의 기사 크롤링
    # 1 <= index <= 14
    # 크롤링한 url들은 crawled/time/urls.json 파일에 저장
    hp.remove_dir_if_exists(vl.TIMES_DIR)
    vl.TIMES_DIR.mkdir(exist_ok=True, parents=True)
    vl.TIME_CRAWLED_DIR.mkdir(exist_ok=True, parents=True)

    count = 0
    urls_dict: dict[int, str] = {}
    for i in range(1, 15):
        html_str = hp.get_html_by_request(f"https://time.com/section/world/?page={i}")
        soup = BeautifulSoup(html_str, 'html.parser')
        get_con = soup.select("body > main > div > section.section-related > div > div.component.taxonomy-related-touts.section-related__touts > div > a")
        for con in get_con:
            url = con.get('href')
            m = re.match(r"/(\d+)/", url)
            if m is None:
                logger.warning(f"m is None, {url}")
                continue
            pan_id = int(m.group(1))
            url = "https://time.com" + url
            img = con.select_one("div.image-wrapper > div > div > div").get('data-src')
            date = con.select_one("div.text > span > span:nth-child(2) > time").get('datetime')
            dt = datetime.fromisoformat(date.rstrip("Z"))
            date_form = dt.strftime("%Y-%m-%d")
            count = count + 1
            urls_dict.update({count: url})
            gen_single_json(url, img, date_form, pan_id)
            logger.debug(f"{url}, {img}, {date_form}, {pan_id}")
    assert len(urls_dict) == 223, "Total time crawl should be 223"
    hp.assert_dir_count(vl.TIME_CRAWLED_DIR, "*.json", 223)
    hp.json_write_by_path(vl.TIMES_URLS_JSON, urls_dict)


def main() -> None:
    if not os.path.exists(vl.CRAWLED_DIR):
        vl.CRAWLED_DIR.mkdir(exist_ok=True, parents=True)

    crawl_data()


if __name__ == "__main__":
    if hasattr(sys, "ps1"):
        pretty.install()
    else:
        with logger.catch():
            typer.run(main)
