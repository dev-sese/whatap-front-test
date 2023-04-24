import { INTERVAL_TIME_CONST } from "@/common/const";
import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useState } from "react";
import BarChart from "@/components/barChart/BarChart";

interface BarChartContainerProps {
  setApiQueue: any;
}

export const BarChartContainer = ({ setApiQueue }: BarChartContainerProps) => {
  const afterDelayApiCall = () => {
    setTimeout(() => {
      setApiQueue((prev: any) => [
        ...prev,
        { key: "dbconn_total", type: "spot" },
        { key: "dbconn_act", type: "spot" },
        { key: "dbconn_idle", type: "spot" },
      ]);
      afterDelayApiCall();
    }, INTERVAL_TIME_CONST);
  };

  useEffect(() => {
    setApiQueue((prev: any) => [
      ...prev,
      { key: "dbconn_total", type: "spot" },
      { key: "dbconn_act", type: "spot" },
      { key: "dbconn_idle", type: "spot" },
    ]);
    afterDelayApiCall();
  }, []);

  return (
    <div>
      {/* <BarChart title={title} apiData={openApiData} labels={spotKeyList} />
      <pre>{JSON.stringify(openApiData, null, 4)}</pre> */}
    </div>
  );
};

// export const BarChartContainer = ({
//   title,
//   spotKeyList,
// }: BarChartContainerProps) => {
//   // API key 리스트의 값을 object key로 가지는 object 생성
//   const makeDataStateKeys = (spotKeyList: OPEN_API_EMPTY_STRING_KEYS[]) => {
//     let dataObj: { [key: string]: undefined } = {};
//     spotKeyList.map((key: OPEN_API_EMPTY_STRING_KEYS) => {
//       dataObj[key] = undefined;
//     });
//     return dataObj;
//   };

//   const [openApiData, setOpenApiData] = useState<{
//     [key: string]: OPEN_API_RESULT | undefined;
//   }>(makeDataStateKeys(spotKeyList));

//   // 첫 호출
//   const firstcaller = (key: any, time: number) => {
//     return new Promise(() => {
//       setTimeout(() => {
//         api
//           .spot(key)
//           .then((result) =>
//             setOpenApiData((prev) => ({ ...prev, [key]: result }))
//           )
//       }, time);
//     })
//   };

//   // interval 호출
//   const Intervalcaller = (key: any, time: number) => {
//     return new Promise(() => {
//       const interval = () => {
//         setTimeout(() => {
//           api
//             .spot(key)
//             .then((result) =>
//               setOpenApiData((prev) => ({ ...prev, [key]: result }))
//             );
//           interval();
//         }, time);
//       };
//       interval();
//     });
//   };

//   const getOpenApi = async (key: any, time: number) => {
//     await firstcaller(key, time);
//   };

//   const getOpenApiInterval = async (key: any) => {
//     await Intervalcaller(key, 5000);
//   };

//   const firstProcess = async () => {
//     spotKeyList.map(async (key: OPEN_API_EMPTY_STRING_KEYS) => {
//       await getOpenApi(key, 0);
//     });
//   };

//   const intervalProcess = async () => {
//     spotKeyList.map(async (key: OPEN_API_EMPTY_STRING_KEYS) => {
//       await getOpenApiInterval(key);
//     });
//   };

//   useEffect(() => {
//     firstProcess();
//     intervalProcess();

//     // return intevalApiCall(key);
//   }, []);

//   return (
//     <div>
//       <BarChart title={title} apiData={openApiData} labels={spotKeyList} />
//       <pre>{JSON.stringify(openApiData, null, 4)}</pre>
//     </div>
//   );
// };
