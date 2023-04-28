import { INTERVAL_S5_TIME_CONST } from "@/common/const";
import { useEffect, useRef, useState } from "react";
import BarChart from "@/components/barChart/BarChart";
import { WidgectPropsType } from "@/common/types";

const DbBarChartContainer = ({
  setApiQueue,
  data,
  pause,
}: WidgectPropsType) => {
  // widget type
  const widgetType = "bar_db";

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
          { key: "dbconn_total", type: "spot", widget: widgetType },
          { key: "dbconn_act", type: "spot", widget: widgetType },
          { key: "dbconn_idle", type: "spot", widget: widgetType },
        ])
      );
      intervalApiCall();
    }, INTERVAL_S5_TIME_CONST);
  };

  // 첫 호출
  useEffect(() => {
    setApiQueue((prev: any) => [
      ...prev,
      { key: "dbconn_total", type: "spot", widget: widgetType },
      { key: "dbconn_act", type: "spot", widget: widgetType },
      { key: "dbconn_idle", type: "spot", widget: widgetType },
    ]);
    intervalApiCall();
  }, []);

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

  return (
    <div>
      <BarChart
        title={"DB"}
        apiData={data}
        list={["dbconn_total", "dbconn_act", "dbconn_idle"]}
      />
    </div>
  );
};

export default DbBarChartContainer;
