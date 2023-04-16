# 📊 대시보드 제작 프로젝트

## 📌 0. 프로젝트 생성 및 실행

기존 자바스크립트로 작성되어 있던 코드를 타입스크립트로 옮기기 위해, Next.js + TypeScript를 사용하여 새로운 react 프로젝트를 만들었습니다. (프로젝트는 새로나온 react.dev 문서의 권장사항을 따라 Next로 만들었습니다.)

프로젝트 실행은 다음 명령어를 입력하여 진행합니다.

```bash
yarn install

yarn dev

# CORS error 방지
# OSX
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

`localhost:3000/dashborad` 로 프로젝트에 접근합니다.

## 📌 1. 애플리케이션 모니터링 대시보드 구성

애플리케이션 모니터링을 위해선 `장애인지지표`와 `장애현상지표`가 필요합니다.

따라서 장애인지지표를 위해 `트랜젝션`를 선택하고, 장애현상지표를 위해 `Heap 메모리(조회시간 내 통계 평균)`, `Heap 메모리(조회시간 내 통계 최댓값)`를 선택하여 모니터링 하였습니다.

이외의 정보성 지표로

`트렌젝션 개수`,`TPS`, `액티브 트렌젝션 개수`

`전체 DB connection 수`, `활성 DB connection 수`, `비활성 DB connection 수`

`활성화 상태의 에이전트 수`, `비활성화 상태의 에이전트 수`

를 선택하였습니다.

또한 메타성 정보로 프로젝트 이름과 플랫폼을 보여줍니다.

## 📌 2. API 구성 특이사항

### BarChart

`https://api.whatap.io/open/api/json/spot` API를 사용하면 한 번의 호출로 데이터들을 불러올 수 있어 더 효과적이나, 과제의 데이터 요청 요구사항에 Endpoint 기준 10개 이상의 Open API 사용이 명시되어 있어 API를 나누어 호출하였습니다.
