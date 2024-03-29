# madcamp_week4

## 📁 프로젝트 소개

---

- Times, Naver News 등 각종 언론사에서 제공하는 기사들을 GPT와 함께, 쉽게 이해할 수 있도록 도와주는 웹사이트입니다.

### ERD

---
Datasets

- Times, Naver News에서 일정 기간(3개월) 기사 내용을 수집 후 전처리 진행
- 각 기사의 내용에 따라 대주제(정치, 경제, 사회, 문화, 세계, 노동, 테크, 라이트), 소주제(기사에 가장 많이 언급된 단어)들을 tag화

---

## 💻 프로젝트 기능

---

### 1️⃣ 로그인, 회원가입
<div align="center">
<img src="https://github.com/surface03/madcamp_week4/assets/128574611/a29ca71e-ab71-4b5f-923b-1335c1c203dd" width="600px" height="330px"/>
</div>

- 자체 회원가입, 로그인을 구현하여, 정보(ID, Name, Age, Gender, P.O., PW)를 입력받습니다.
- 회원가입시 로그인 창으로 연결되며, ID와 PW를 입력받아 로그인을 할 수 있습니다.

### 2️⃣ 메인 페이지
**1] 메인 페이지**
<table align="center">
  <tr>
    <td><img src="https://github.com/surface03/madcamp_week4/assets/128574611/ea58dff8-2b94-4f59-ba60-e491097974eb" style="width: 100%"></td>
    <td><img src="https://github.com/surface03/madcamp_week4/assets/128574611/0e56157b-c8f7-4739-a9e5-a12aae28c81c" style="width: 100%"></td>
  </tr>
</table>

- **상단: 로고, 대주제 tag가 포함되어 있는 bar**
    - 로고: 클릭시 메인페이지로 돌아옵니다.
    - 상단바: 각 주제를 클릭시, 그 대주제에 해당하는 모든 기사를 grid-view, 최신순으로 불러옵니다.
- **오른쪽: 기사들에서 공통적으로 포함된, top10의 세부 tag bar**
    - 좌단바: 각 세부 주제를 클릭시, 그 세부주제에 해당하는 모든 기사 grid-view, 과거순으로 불러옵니다.
- **본문:  일정 기간, 가장 많이 언급된 상위 30개의 세부 tag를 가장 많이 포함하고 있는 상위 12개의 기사를 보여줍니다.**

 **2] 소주제 선택시 출력페이지**
<table align="center">
  <tr>
    <td><img src="https://github.com/surface03/madcamp_week4/assets/128574611/d1bfc295-a862-4403-b6b7-2ddf7057d43a" style="width: 100%"></td>
    <td><img src="https://github.com/surface03/madcamp_week4/assets/128574611/b582ac07-cd23-46c4-b342-1500e039fc5d" style="width: 100%"></td>
  </tr>
</table>

- **출력페이지 호출 방법**
    - 메인페이지의 좌단바에 존재하는 소주제를 클릭
    - 기사의 grid-item을 우클릭시 나타나는 소주제를 클릭

- **출력페이지**
    - 소주제를 포함하고 있는 기사를 과거순으로 화살표 방향을 통해 보여줍니다.
    - 상단에 있는 ‘소주제 기사 요약’을 버튼을 클릭하게 된다면, 해당하는 소주제에 대한 모든 기사들의 내용 시간 순으로 요약해주는 GPT응답을 불러올 수 있습니다.
    - 기사를 스크롤하고 더 많은 기사를 보고 싶다면, ‘show-more’ 버튼을 클릭하면 됩니다.


### 3️⃣ 상세 페이지
<table align="center">
  <tr>
    <td><img src="https://github.com/surface03/madcamp_week4/assets/128574611/460ba78c-d4a2-4d93-ac99-d9a6e9364bd6" style="width: 100%"></td>
    <td><img src="https://github.com/surface03/madcamp_week4/assets/128574611/052012d1-144a-48c6-a23c-f93e683dc0fc" style="width: 100%"></td>
  </tr>
</table>

- 기사를 클릭하게 된다면, 기사의 정보(제목, 본문, 관련 사진)를 보여줍니다.
- 만약 기사 본문에서 모르는 단어가 있다면, 그 단어를 클릭하면 창이 생성되며 이를 보여줍니다. (중복되는 단어는 추가되지 않습니다.)
- 클릭된 단어는 기사 맥락에 맞추어 용어를 설명해주는 GPT 연동 창에 반영됩니다. (응답을 얻고 싶다면, 용어 설명 버튼을 누르면 됩니다.)


### 4️⃣ 마이페이지
<div align="center">
<img src="https://github.com/surface03/madcamp_week4/assets/128574611/482648ba-c7a3-4a35-a7c6-419c045911f7" width="600px" height="330px"/>
</div>

- MyPage에 들어온다면, 회원가입시 입력했던 정보가 보여집니다.
- 좌측의 그래프에는 봤던 모든 기사들에 해당하는 tag가 몇 회 count된 정보에서 가장 많이 해당하는 상위 10개의 tag를 보여줍니다. (그래프는 다운로드가 가능합니다)
- 나의 성향 분석 버튼을 누른다면, 회원가입시 입력했던 정보 및 tag-count 정보를 종합하여 성향을 분석해주는 GPT의 응답을 보여줍니다.

---

### 팀원

---

**김기현** 

- Crawling
- FE

**조백균** 

- BE
- FE

### 개발 환경

---

- **FE**
    - React, Javascript
- **BE**
    - Server: Node js
    - DB: MySQL
- **Crawling**
    - Python
