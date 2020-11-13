# dev-log Client
CodeStates Immersive 22기 3조 knock knock 팀의 First-Project 입니다.  
Front - end : 이한슬(팀장), 권수진 
Back - end : 윤 연, 김종환   
(server 측 레포는 [여기](https://github.com/codestates/dev.log-server)입니다)
   

## Description
해당 서비스는 개발자 팀의 협업을 위한 개발 기록 웹 서비스입니다. 기본적인 글 작성, 필터링, 검색 기능과 함께 Custom 기능과 함께있습니다.
자세한 개발과정을 알고 싶다면 [wiki](https://github.com/codestates/dev.log-server/wiki)를 참고해주세요

## Getting Start

1. `cd client`를 입력하여 client 폴더로 들어가주세요.
2. `npm install` 혹은 `yarn start`를 통해 모듈을 설치해주세요.
3. `npm start`를 통해 페이지를 시작할 수 있습니다.
4. 로그인 전에 서버가 연결되었는지, 로컬인지 EC2 도메인인지 먼저 확인해주세요.

이후에는 자유롭게 사용해 주세요 :)
   

## Feature

### Basic

1. 로그인, 로그아웃, 마이페이지, 회원가입
2. 글 작성, 검색, 수정, 삭제
3. 서로의 글에 댓글 작성 및 삭제
4. 작성 일자, 조회 수, 댓글 수를 기준으로 한 정렬 기능
5. 카테고리 별로 글 목록 보기
6. 필요에 따라 카테고리 생성
7. 사용자의 필요성에 따라 글 모아두기

   : 스크랩한 글, 작성한 글, 본인이 태그된 글 등 모아보기

### Advance

1. 소셜 로그인(Naver, Github) : 서버측에만 구현완료 됨.
2. 글 작성 시 태그 생성 및 팀원 태그
   

## Stack

Form : eslint, Prettier

1. 기본 컴포넌트 : React, React-dom, React-Router-Bom
2. URL 모듈 : axios
3. CSS : style-components, fortawesome
   

## Runtime

Node.js : 12.18.4

NPM : 6.14.6
   

### 폴더 구조

client   
├── package-lock.json   
├── package.json  
├── public : 로고 이미지 및 index   

└── src  
├── index.js : root 파일  
├── App.js : Login, Signup, Listup이 Login 여부에 따라 라우팅  
├── Login.js   

├── Mypage.js  
├── Signup.js  
├── Main 

│ ├── Category : 화면 왼쪽의 category를 렌더링 하는 컴포넌트 폴더   
│ │ ├── Category.js  
│ │ └── CategoryEntry.js   

│ ├── Content : Content의 내용을 렌더링하는 컴포넌트 폴더   
│ │ ├── ContentDetail   
│ │ │ ├── Comment.js 
│ │ │ ├── CommentEntry.js  
│ │ │ └── ContentDetail.js 

│ │ ├── ContentList  
│ │ │ ├── Contents.js   
│ │ │ └── ContentsEntry.js 

│ │ └── Post.js : 글 작성 및 수정 컴포넌트 

│ ├── Custom : 화면 오른쪽의 사용자의 편의에 맞게 모아둔 글을 렌더링 하는 폴더   
│ │ ├── Custom.js 
│ │ └── CustomEntry.js  

│ ├── Listup.js : 로그인 후 보이는 화면 전체를 라우팅 하는 컴포넌트  
│ ├── Footer.js : 화면 최하단의 컴포넌트   

│ └── Nav : 화면 상단의 로고, 검색, 로그아웃 등을 렌더링 하는 폴더 
│ ├── Logo.js  
│ ├── Nav.js   
│ ├── Search.js   
│ └── User.js  

├── serviceWorker.js 

└── setupTests.js 
