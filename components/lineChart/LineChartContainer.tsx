import { INTERVAL_M5_TIME_CONST } from "@/common/const";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useRef, useState } from "react";
import LineChart from "./LineChart";

interface LineChartContainerProps {
  setApiQueue: any;
  data: any;
}

const LineChartContainer = ({ setApiQueue, data }: LineChartContainerProps) => {
  // widget type
  const widgetType = "line_txcount";

  // endtime 관리
  const [etime, setEtime] = useState(Date.now());
  const currentEndTimeRef = useRef(etime);
  currentEndTimeRef.current = etime;

  useEffect(() => {
    if (data["today"]) {
      setEtime(data?.["today"].data.etime);
    }
  }, [data["today"]]);

  // interval 호출
  const intervalApiCall = () => {
    setTimeout(() => {
      setApiQueue((prev: any) => [
        ...prev,
        {
          key: "thread_count/{stime}/{etime}/1387800924",
          type: "series",
          widget: widgetType,
          stime: currentEndTimeRef.current,
          etime: Date.now(),
          time: "today",
        },
      ]);
      intervalApiCall();
    }, INTERVAL_M5_TIME_CONST);
  };

  // 첫 API 호출
  useEffect(() => {
    let today = new Date();
    let todayStart = today.setHours(0, 0, 0);
    today.setDate(today.getDate() - 1);
    let yesterdayStart = today.setHours(0, 0, 0);
    let yesterdayEnd = today.setHours(23, 59, 59);

    setApiQueue((prev: any) => [
      ...prev,
      {
        key: "thread_count/{stime}/{etime}/1387800924",
        type: "series",
        widget: widgetType,
        stime: yesterdayStart,
        etime: yesterdayEnd,
        time: "yesterday",
      },
      {
        key: "thread_count/{stime}/{etime}/1387800924",
        type: "series",
        widget: widgetType,
        stime: todayStart,
        etime: etime,
        time: "today",
      },
    ]);
    intervalApiCall();
  }, []);

  return (
    <div>
      <LineChart
        title="thread_count"
        apiData={data}
        list={["yesterday", "today"]}
      />
    </div>
  );
};

export default LineChartContainer;
