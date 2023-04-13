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

localhost:3000 으로 프로젝트에 접근합니다.

## 📌 1. 애플리케이션 모니터링 대시보드 구성

애플리케이션 모니터링을 위해선 `장애인지지표`와 `장애현상지표`가 필요합니다.

따라서 장애인지지표를 위해 `TPS`를 선택하고, 장애현상지표를 위해 `CPU`와 `Heap 메모리`를 선택하여 모니터링 하였습니다.

이외의 정보성 지표로

`트렌젝션 개수`,`액티브 트렌젝션 개수`

`전체 DB connection 수`, `활성 DB connection 수`, `비활성 DB connection 수`

`활성화 상태의 에이전트 수`, `비활성화 상태의 에이전트 수`

를 선택하였습니다.

또한 메타성 정보로 프로젝트 이름과 플랫폼을 보여줍니다.
