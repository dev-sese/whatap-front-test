const DEMO_PROJECT_API_TOCKEN = "XGJHUSQZTI2AVIENWA27HI5V";
const DEMO_PROJECT_CODE = 5490;
export const OPEN_API_HEADERS: HeadersInit = {
  "x-whatap-pcode": DEMO_PROJECT_CODE.toString(),
  "x-whatap-token": DEMO_PROJECT_API_TOCKEN,
};

export const OPEN_API_ROOT = "https://api.whatap.io/open/api";

export const OPEN_API = {
  "": {
    act_agent: "활성화 상태의 에이전트 수",
    inact_agent: "비활성화 상태의 에이전트 수",
    host: "호스트 수",
    cpucore: "호스트의 CPU 코어 합",
    txcount: "트랜잭션 수",
    tps: "초당 트랜잭션 수",
    user: "5분간 집계된 고유 사용자 수",
    actx: "액티브 트랜잭션 수",
    rtime: "평균 응답 시간",
    cpu: "CPU 사용률",
    threadpool_active: "쓰레드풀 활성 쓰레드 수",
    threadpool_queue: "쓰레드풀 큐잉 쓰레드 수",
    dbconn_total: "전체 DB Connection 수",
    dbconn_act: "활성(Active) DB Connection 수",
    dbconn_idle: "비활성(Idle) DB Connection 수",
    act_method: "액티브 Method 수",
    act_sql: "액티브 SQL 수",
    act_httpc: "액티브 HTTP Call 수",
    act_dbc: "액티브 DB Connection 수",
    act_socket: "액티브 Socket 수",
  },
  json: {
    "transaction/{stime}/{etime}/s5": "transaction",
    "heap_use/{stime}/{etime}/max": "heap 통계 최댓값",
    "heap_use/{stime}/{etime}/avg": "heap 통계 평균",
    "exception/{stime}/{etime}/s5": "Exception 발생 ",
    "exception/{stime}/{etime}": "Exception 발생 ",
    "thread_count/{stime}/{etime}/s5": "thread count ",
    project: "프로젝트 정보",
  },
};

// 데이터 갱신 주기(5초)
export const INTERVAL_TIME_CONST = 5 * 1000;

// 이전 데이터
