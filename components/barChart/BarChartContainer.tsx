import { INTERVAL_TIME_CONST } from "@/common/const";
import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useState } from "react";
import BarChart from "@/components/barChart/BarChart";

interface BarChartContainerProps {
  title: string;
  spotKeyList: OPEN_API_EMPTY_STRING_KEYS[];
}

export const BarChartContainer = ({
  title,
  spotKeyList,
}: BarChartContainerProps) => {
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

  // const intevalApiCall = (key: OPEN_API_EMPTY_STRING_KEYS) => {
  //   // 첫 호출시 바로 실행되는 함수
  //   setTimeout(() => {
  //     api
  //       .spot(key)
  //       .then((result) =>
  //         setOpenApiData((prev) => ({ ...prev, [key]: result }))
  //       );
  //   }, 10);
  //   // 정해진 간격으로 실행되는 함수
  //   const afterDelayApiCall = () => {
  //     setTimeout(() => {
  //       api
  //         .spot(key)
  //         .then((result) =>
  //           setOpenApiData((prev) => ({ ...prev, [key]: result }))
  //         );
  //       afterDelayApiCall();
  //     }, INTERVAL_TIME_CONST + 10);
  //   };
  //   afterDelayApiCall();
  // };

  // 첫 호출
  const firstcaller = (key: any, time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        api
          .spot(key)
          .then((result) =>
            setOpenApiData((prev) => ({ ...prev, [key]: result }))
          );
      }, time);
    });
  };

  let test: any = undefined;

  // interval 호출
  const Intervalcaller = (key: any, time: number) => {
    return new Promise((resolve) => {
      const interval = () => {
        setTimeout(() => {
          api
            .spot(key)
            .then((result) =>
              setOpenApiData((prev) => ({ ...prev, [key]: result }))
            );
          interval();
        }, time);
      };
      interval();
    });
  };

  const getOpenApi = async (key: any, time: number) => {
    const result = await firstcaller(key, time);
    return result;
  };

  const getOpenApiInterval = async (key: any) => {
    const result = await Intervalcaller(key, 5000);
    return result;
  };

  const firstProcess = async () => {
    spotKeyList.map(async (key: OPEN_API_EMPTY_STRING_KEYS) => {
      await getOpenApi(key, 0);
    });
  };

  const intervalProcess = async () => {
    spotKeyList.map(async (key: OPEN_API_EMPTY_STRING_KEYS) => {
      await getOpenApiInterval(key);
    });
  };

  useEffect(() => {
    firstProcess();
    intervalProcess();

    // return intevalApiCall(key);
  }, []);

  return (
    <div>
      <BarChart title={title} apiData={openApiData} labels={spotKeyList} />
      <pre>{JSON.stringify(openApiData, null, 4)}</pre>
    </div>
  );
};

export const BarChartContainerTest = ({
  title,
  spotKeyList,
}: BarChartContainerProps) => {
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
    }, 20);
    // 정해진 간격으로 실행되는 함수
    const afterDelayApiCall = () => {
      setTimeout(() => {
        api
          .spot(key)
          .then((result) =>
            setOpenApiData((prev) => ({ ...prev, [key]: result }))
          );
        afterDelayApiCall();
      }, INTERVAL_TIME_CONST + 20);
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
