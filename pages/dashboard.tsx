import Informatics from "@/components/Informatics";
import type { NextPage } from "next";
import LineChartContainer from "@/components/lineChart/LineChartContainer";
import { useEffect, useState } from "react";
import api from "@/pages/api/openApi";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";
import DbBarChartContainer from "@/components/barChart/DbBarChartContainer";
import TxBarChartContainer from "@/components/barChart/TxBarChartContainer";

const Dashboard: NextPage = () => {
  // API 큐
  const [apiQueue, setApiQueue] = useState<
    {
      type: string;
      key: OPEN_API_EMPTY_STRING_KEYS | OPEN_API_JSON_KEYS;
      widget: string;
      etime?: number;
      stime?: number;
    }[]
  >([]);

  // 결과값 저장
  const [apiResponse, setApiResponse] = useState<{
    [key: string]: OPEN_API_RESULT;
  }>({});

  // 큐에 변화가 생기면 API 호출
  useEffect(() => {
    if (apiQueue.length !== 0) {
      let currentQueue = apiQueue;
      let currentApi = currentQueue.slice(0, 1)[0];
      switch (currentApi.type) {
        // spot성 데이터 호출
        case "spot":
          try {
            api.spot(currentApi.key).then((result) => {
              setApiResponse({ ...apiResponse, [currentApi.key]: result });
              setApiQueue(currentQueue.slice(1));
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
                setApiResponse({ ...apiResponse, [currentApi.key]: result });
                setApiQueue(currentQueue.slice(1));
              });
          } catch (e) {
            console.log("error", e);
          }
          break;
      }
    }
  }, [apiQueue]);

  return (
    <main>
      <section>
        <Informatics setApiQueue={setApiQueue} data={apiResponse?.[""]} />
      </section>
      <section>
        <TxBarChartContainer setApiQueue={setApiQueue} data={apiResponse} />
        <DbBarChartContainer setApiQueue={setApiQueue} data={apiResponse} />
      </section>
      <section>
        <LineChartContainer
          setApiQueue={setApiQueue}
          data={apiResponse?.["line_txcount"]}
        />
      </section>
    </main>
  );
};

export default Dashboard;
