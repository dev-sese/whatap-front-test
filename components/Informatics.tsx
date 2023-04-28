import { useEffect, useRef, useState } from "react";
import { INTERVAL_S5_TIME_CONST } from "@/common/const";
import { WidgectPropsType } from "@/common/types";

const Informatics = ({ setApiQueue, data, pause }: WidgectPropsType) => {
  // widget type
  const widgetType = "info";

  // clear timeout
  const [beforeTimeout, setBeforeTimeout] = useState<NodeJS.Timeout>();
  const currentRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(beforeTimeout);
    return () => {
      setBeforeTimeout(currentRef.current);
    };
  }, [currentRef.current]);

  // interval
  const intervalApiCall = () => {
    currentRef.current = setTimeout(() => {
      setApiQueue((prev: any) =>
        prev.concat([
          { key: "act_agent", type: "spot", widget: widgetType },
          { key: "inact_agent", type: "spot", widget: widgetType },
        ])
      );

      intervalApiCall();
    }, INTERVAL_S5_TIME_CONST);
  };

  // 일시정지 시 Queue 등록 멈춤 & 재시작 시 등록 재시작
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      if (pause) {
        clearTimeout(currentRef.current);
      } else {
        intervalApiCall();
      }
    }
  }, [pause]);

  useEffect(() => {
    setApiQueue((prev: any) => [
      ...prev,
      { key: "act_agent", type: "spot", widget: widgetType },
      { key: "inact_agent", type: "spot", widget: widgetType },
    ]);

    intervalApiCall();
  }, []);

  return (
    <div>
      <p>{`활성화 에이전트 수 ${
        data["act_agent"] ? data["act_agent"].data : 0
      }`}</p>
      <p>{`비활성화 에이전트 수 ${
        data["inact_agent"] ? data["inact_agent"].data : 0
      }`}</p>
    </div>
  );
};

export default Informatics;
