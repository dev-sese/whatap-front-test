import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import { useEffect, useState } from "react";
import api from "@/pages/api/openApi";
import { INTERVAL_TIME_CONST } from "@/common/const";

interface InformaticsProps {
  setApiQueue: any;
  data: any;
}

const Informatics = ({ setApiQueue, data }: InformaticsProps) => {
  // widget type
  const widgetType = "info";

  const afterDelayApiCall = () => {
    setTimeout(() => {
      setApiQueue((prev: any) => [
        ...prev,
        { key: "actx", type: "spot", widget: widgetType },
      ]);
      afterDelayApiCall();
    }, INTERVAL_TIME_CONST);
  };

  useEffect(() => {
    setApiQueue((prev: any) => [
      ...prev,
      { key: "txcount", type: "spot", widget: widgetType },
      { key: "actx", type: "spot", widget: widgetType },
    ]);
    afterDelayApiCall();
  }, []);

  return (
    <div>
      <span>액티브 트랜젝션 수</span>
      <span>{data?.data}</span>
    </div>
  );
};

export default Informatics;

// const Informatics = ({ spotKey }: InformaticsProps) => {
//   const [openApiData, setOpenApiData] = useState<OPEN_API_RESULT>();

//   const intevalApiCall = () => {
//     // 첫 호출시 바로 실행되는 함수
//     setTimeout(() => {
//       api.spot(spotKey).then((result) => setOpenApiData(result));
//     }, 0);
//     // 정해진 간격으로 실행되는 함수
//     const afterDelayApiCall = () => {
//       setTimeout(() => {
//         api.spot(spotKey).then((result) => setOpenApiData(result));
//         afterDelayApiCall();
//       }, INTERVAL_TIME_CONST);
//     };
//     afterDelayApiCall();
//   };

//   useEffect(() => {
//     intevalApiCall();
//   }, []);

//   return (
//     <div>
//       {typeof openApiData === "object" && (
//         <div>
//           <span>{openApiData.name}</span>
//           <span>
//             {typeof openApiData.data === "number" && openApiData.data}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Informatics;
