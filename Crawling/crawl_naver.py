import dataclasses
import json
import random
import re
import os
import sys
import time
from datetime import datetime
from importlib import reload
from pathlib import Path
import typer
from bs4 import BeautifulSoup
from loguru import logger
from rich import pretty
from tqdm import tqdm
from dateutil.parser import parser
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import helper_function as hp
import info_class
import var_list as vl


def gen_single_json(url: str, img: str, pan_id: str) -> None:
    html = hp.get_html_by_request(url)
    soup = BeautifulSoup(html, 'html.parser')
    get_title = soup.select("#title_area")
    title_str = ""
    for i in get_title:
        title_str = title_str + i.get_text()

    get_body = soup.select("#newsct_article")
    body_str = ""
    for i in get_body:
        body_str = body_str + i.get_text()

    get_time = soup.select_one("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div:nth-child(1) > span").get('data-date-time')


    info1 = info_class.Info(
        uid=str(pan_id),
        article_url=url,
        title_text=title_str,
        body_text=body_str,
        thumbnail=img,
        article_date=get_time,
        site_info="naver",
        like_count=None,
        viewed_count=None,
        tags=[],
    )
    d1 = dataclasses.asdict(info1)

    fname = vl.NAVER_CRAWLED_DIR / f"{pan_id}.json"
    hp.json_write_by_path(fname, d1)


def crawl_data() -> None:
    # https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=104#&date=%2000:00:00&page={index} 의 기사 크롤링
    # 1 <= index <= 112?
    # 크롤링한 url들은 crawled/naver/urls.json 파일에 저장
    chrome_options = Options()
    chrome_options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(3)

    hp.remove_dir_if_exists(vl.NAVER_DIR)
    vl.NAVER_DIR.mkdir(exist_ok=True, parents=True)
    vl.NAVER_CRAWLED_DIR.mkdir(exist_ok=True, parents=True)

    count = 0
    urls_dict: dict[int, str] = {}
    for i in range(1, 108):

        driver.get(f"https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=104#&date=%2000:00:00&page={i}")
        time.sleep(2)
        # logger.debug(i)

        get_con = driver.find_elements(By.CSS_SELECTOR, "#section_body > ul > li > dl > dt.photo > a")

        for con in get_con:
            try:
                url = con.get_attribute('href')
                img_element = con.find_element(By.TAG_NAME, 'img')
                img_src = img_element.get_attribute('src')
                count = count + 1
                urls_dict.update({count: url})
                logger.debug(f"url: {url}, img: {img_src}")
                gen_single_json(url, img_src, f"naver_{count}")
            except Exception as e:
                logger.warning("Exception")
            #logger.debug(f"{url}, {img}, {date_form}, {pan_id}")

    hp.json_write_by_path(vl.NAVER_URLS_JSON, urls_dict)


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
