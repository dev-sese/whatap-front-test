import { INTERVAL_M5_TIME_CONST, INTERVAL_S5_TIME_CONST } from "@/common/const";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useRef, useState } from "react";
import LineChart from "./LineChart";
import RealTimeLineChart from "./RealTimeLineChart";

interface LineChartContainerProps {
  setApiQueue: any;
  data: any;
}

const ScLineChartContainer = ({
  setApiQueue,
  data,
}: LineChartContainerProps) => {
  // widget type
  const widgetType = "second_line";

  // interval
  const intervalApiCall = () => {
    setTimeout(() => {
      setApiQueue((prev: any) => [
        ...prev,
        { key: "cpu", type: "spot", widget: widgetType },
      ]);
      intervalApiCall();
    }, INTERVAL_S5_TIME_CONST);
  };

  // 첫 호출
  useEffect(() => {
    setApiQueue((prev: any) => [
      ...prev,
      { key: "cpu", type: "spot", widget: widgetType },
    ]);
    intervalApiCall();
  }, []);

  return (
    <div>
      <RealTimeLineChart title="CPU" apiData={data} list={["cpu"]} />
    </div>
  );
};

export default ScLineChartContainer;
