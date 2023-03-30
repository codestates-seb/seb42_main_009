# seb42_main_009_슬기로운 약국생활

<img height="200" width="300" src="https://user-images.githubusercontent.com/77083074/228701085-358530b5-6f17-425a-a48a-baeac2eda5af.png" />

--------------------------------------------------

## 📖 About project
![image](https://user-images.githubusercontent.com/77083074/228701310-9275c4e4-f9ae-4e21-9ca4-a3b4caf83a5a.png)

> 내 손 안에 약학 사전, PharmPalm
>> 내가 먹는 약의 용법이 궁금하거나 주의사항 확인이 필요할 때, 
>> 내 손바닥 안의 PharmPalm으로 편리하게 정보를 확인이 가능.

---------------------------------------------------

## 💊Deployed Link

> [PharmPalm](http://pharm-palm-deploy.s3-website.ap-northeast-2.amazonaws.com/)

---------------------------------------------------

* [사용자 요구사항 명세서](https://docs.google.com/spreadsheets/d/1uAmwpCabhF3UgcaC4mjddU54Ge-pdsUlFcKsP8p1-RE/edit#gid=0)
* [화면정의서](https://www.figma.com/file/n1LDvEwktvxYySmqJyGRzY/pharm-palm?node-id=0%3A1&t=8bpaxMheY6TfJ7n1-1)
* [개인 기술발표 영상](https://youtu.be/b2dhjYz09i0)
* [서비스 매뉴얼 가이드 문서](https://www.notion.so/PharmPalm-c33bb4dcb34a44e4af9b7cf6ddc980b3?pvs=4)

----------------------------------------

## 💻 팀원별 개발 내용 

--- 
| 이름 | 역할 | 개발내용 |
| :----: | :---: | :----- | 
| 곽훈정 | BE | RDS, DB 관리 <br/> Open API Data Storage <br/> Medicine 도메인 <br/> Dose 도메인 <br/> 좋아요 기능 <br/> QueryDSL |
| 김진영 | BE | EC2, 서버관리 <br/> S3 이미지 업로드 <br/> Review 도메인 <br/> OAuth2.0 네이버, 카카오 |
| 심라율 | BE | S3 <br/> Spring Security <br/> JWT 인증, 권한 <br/> Member 도메인 <br/> Disease 도메인 |
| 김여진 | FE | 문서 작성 <br/> 전체 페이지 UI <br/> 랜딩 페이지 <br/> 약 조회 페이지 <br/> 약 관리 페이지 <br/> 무한 스크롤 |
| 이치윤 | FE | 로그인, 소셜로그인, 회원가입 <br/> 리뷰작성 <br/> 마이페이지 <br/> 약 관리 페이지 <br/> 검색 기능 <br/> 좋아요 기능 <br/> 전체 페이지 CRUD 기능 구현 <br/> 페이지네이션 <br/> 차트  |

------------------

## 사용 기술 스택

### 💄 Front-end
| React | React Router | React Icons | Styled-<br>Components | Zustand | OAuth2.0 | JWT |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  <img height="65" width="65" src="https://cdn.simpleicons.org/react/#61DAFB" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/reactrouter" /> |  <img height="65" width="65" src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667" />  |  <img height="65" width="65" src="https://cdn.simpleicons.org/styledComponents" /> | <img height="65" width="65" src="https://cdn.discordapp.com/attachments/1074553703329173596/1079638795395268689/bear.png" /> | <img height="65" width="65" src="https://user-images.githubusercontent.com/77083074/228705146-5d1ac1e6-b78a-41cd-bd1b-c80803c7f380.png" /> | <img height="65" width="65" src="https://cdn.discordapp.com/attachments/1083294900080103445/1090807082552406016/icons8-json-web-token-144.png" /> |

### 🧰 Back-end
| Java| Spring Boot | Spring Security | Gradle | mySQL | AWS | OAuth2.0 | JWT |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|  <img height="65" width="65" src="https://user-images.githubusercontent.com/97998938/221740290-7f2b2f08-8ca2-46e3-88ff-30897cfe6d22.png" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/springboot/#6DB33F" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/springsecurity" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/gradle" />  |  <img height="65" width="65" src="https://cdn.simpleicons.org/mysql" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/amazonaws/" /> | <img height="65" width="65" src="https://user-images.githubusercontent.com/77083074/228705176-7911e388-8fb8-4d33-a75a-3b4cfde3849a.png" /> | <img height="65" width="65" src="https://cdn.discordapp.com/attachments/1083294900080103445/1090807082552406016/icons8-json-web-token-144.png" /> |

### 🔧 Deploy
| GitPage | AWS EC2 | AWS S3 | AWS RDS |
| :---: | :---: | :---: | :---: |
|  <img height="65" width="65" src="https://cdn.simpleicons.org/github" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/amazonec2" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/amazons3" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/amazonrds" />

---

## Commit 컨벤션
| Tag Name | Description |
| --- | --- |
| feat | 새로운 기능을 추가 |
| fix | 버그 수정 |
| design | CSS 등 사용자 UI 디자인 변경 |
| !BREAKING CHANGE | 커다란 API 변경의 경우 |
| !HOTFIX | 급하게 치명적인 버그를 고쳐야하는 경우 |
| style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| refactor | 프로덕션 코드 리팩토링 |
| comment | 필요한 주석 추가 및 변경 |
| docs | 문서 수정 |
| test | 테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음 |
| chore | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
| rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |
| remove | 파일을 삭제하는 작업만 수행한 경우 |


