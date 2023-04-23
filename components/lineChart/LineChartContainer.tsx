import { INTERVAL_TIME_CONST } from "@/common/const";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";

interface LineChartContainerProps {
  title: string;
  spotKey: OPEN_API_EMPTY_STRING_KEYS;
}

const LineChartContainer = ({ title, spotKey }: LineChartContainerProps) => {
  const [openApiData, setOpenApiData] = useState<any>();

  // const intevalApiCall = (key: OPEN_API_JSON_KEYS) => {
  //   // 첫 호출시 바로 실행되는 함수
  //   setTimeout(() => {
  //     api
  //       .series(key, {
  //         stime: Date.now() - 3600000,
  //         etime: Date.now(),
  //       })
  //       .then((result) => setOpenApiData(result));
  //   }, 0);
  //   // 정해진 간격으로 실행되는 함수
  //   const afterDelayApiCall = () => {
  //     setTimeout(() => {
  //       api
  //         .series(key, {
  //           stime: Date.now() - 300000,
  //           etime: Date.now(),
  //         })
  //         .then((result) => setOpenApiData(result));
  //       afterDelayApiCall();
  //     }, INTERVAL_TIME_CONST);
  //   };
  //   afterDelayApiCall();
  // };

  const intevalApiCall = (key: OPEN_API_EMPTY_STRING_KEYS) => {
    // 첫 호출시 바로 실행되는 함수
    setTimeout(() => {
      api.spot(key).then((result) => setOpenApiData(result.data));
    }, 10);
    // 정해진 간격으로 실행되는 함수
    const afterDelayApiCall = () => {
      setTimeout(() => {
        api.spot(key).then((result) => setOpenApiData(result.data));
        afterDelayApiCall();
      }, INTERVAL_TIME_CONST + 10);
    };
    afterDelayApiCall();
  };

  useEffect(() => {
    intevalApiCall(spotKey);
  }, []);

  return (
    <div>
      <LineChart title="line chart" apiData={openApiData} />
    </div>
  );
};

export default LineChartContainer;
