import Informatics from "@/components/Informatics";
import type { NextPage } from "next";
import LineChartContainer from "@/components/lineChart/LineChartContainer";
import { useEffect, useReducer, useState } from "react";
import api from "@/pages/api/openApi";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";
import DbBarChartContainer from "@/components/barChart/DbBarChartContainer";
import TxBarChartContainer from "@/components/barChart/TxBarChartContainer";
import MmLineChartContainer from "@/components/lineChart/MmLineChartContainer";
import ScLineChartContainer from "@/components/lineChart/ScLineChartContainer";

const Dashboard: NextPage = () => {
  // 일시정지 관리
  const [pause, setPause] = useState(false);

  // // API 큐
  const [apiQueue, setApiQueue] = useState<
    {
      type: string;
      key: OPEN_API_EMPTY_STRING_KEYS | OPEN_API_JSON_KEYS;
      widget: string;
      etime?: number;
      stime?: number;
      time: string;
    }[]
  >([]);

  // 결과값 저장
  const [apiResponse, setApiResponse] = useState<{
    [key: string]: OPEN_API_RESULT | void;
  }>({});

  // 큐에 변화가 생기면 API 호출
  useEffect(() => {
    if (apiQueue?.length === 0) {
      return;
    }

    let currentApi = apiQueue?.[0];
    console.log(apiQueue);
    switch (currentApi?.type) {
      // spot성 데이터 호출
      case "spot":
        try {
          api.spot(currentApi.key).then((result) => {
            setApiResponse({ ...apiResponse, [currentApi.key]: result });
            setApiQueue((prev) => prev.slice(1));
          });
        } catch (e) {
          console.log("error", e);
        }
        break;
      // 통계성 데이터 호출
      case "series":
        try {
          api
            .series(currentApi.key, {
              stime: currentApi.stime!,
              etime: currentApi.etime!,
            })
            .then((result) => {
              setApiResponse({ ...apiResponse, [currentApi.time]: result });
              setApiQueue((prev) => prev.slice(1));
            });
        } catch (e) {
          console.log("error", e);
        }
        break;
    }
  }, [apiQueue]);

  return (
    <main>
      <button
        onClick={() => {
          setPause(true);
        }}
      >
        일시정지
      </button>
      <button
        onClick={() => {
          setPause(false);
        }}
      >
        재시작
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <section>
          <Informatics
            setApiQueue={setApiQueue}
            data={apiResponse}
            pause={pause}
          />
        </section>
        <section>
          <TxBarChartContainer
            setApiQueue={setApiQueue}
            data={apiResponse}
            pause={pause}
          />
          <DbBarChartContainer
            setApiQueue={setApiQueue}
            data={apiResponse}
            pause={pause}
          />
        </section>
        <section>
          <MmLineChartContainer
            setApiQueue={setApiQueue}
            data={apiResponse}
            pause={pause}
          />
          <ScLineChartContainer
            setApiQueue={setApiQueue}
            data={apiResponse}
            pause={pause}
          />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
