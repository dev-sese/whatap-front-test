import { INTERVAL_TIME_CONST } from "@/common/const";
import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";

interface BarChartContainerProps {
  title: string;
  spotKeyList: OPEN_API_EMPTY_STRING_KEYS[];
}

const BarChartContainer = ({ title, spotKeyList }: BarChartContainerProps) => {
  // API key 리스트의 값을 object key로 가지는 object 생성
  const makeDataStateKeys = (spotKeyList: OPEN_API_EMPTY_STRING_KEYS[]) => {
    let dataObj: { [key: string]: undefined } = {};
    spotKeyList.map((key: OPEN_API_EMPTY_STRING_KEYS) => {
      dataObj[key] = undefined;
    });
    return dataObj;
  };

  const [openApiData, setOpenApiData] = useState<{
    [key: string]: OPEN_API_RESULT | undefined;
  }>(makeDataStateKeys(spotKeyList));

  const intevalApiCall = (key: OPEN_API_EMPTY_STRING_KEYS) => {
    // 첫 호출시 바로 실행되는 함수
    setTimeout(() => {
      api
        .spot(key)
        .then((result) =>
          setOpenApiData((prev) => ({ ...prev, [key]: result }))
        );
    }, 0);
    // 정해진 간격으로 실행되는 함수
    const afterDelayApiCall = () => {
      setTimeout(() => {
        api
          .spot(key)
          .then((result) =>
            setOpenApiData((prev) => ({ ...prev, [key]: result }))
          );
        afterDelayApiCall();
      }, INTERVAL_TIME_CONST);
    };
    afterDelayApiCall();
  };

  useEffect(() => {
    spotKeyList.map((key: OPEN_API_EMPTY_STRING_KEYS) => {
      return intevalApiCall(key);
    });
  }, []);

  return (
    <div>
      <BarChart title={title} apiData={openApiData} labels={spotKeyList} />
      <pre>{JSON.stringify(openApiData, null, 4)}</pre>
    </div>
  );
};

export default BarChartContainer;
