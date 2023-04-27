import { INTERVAL_M5_TIME_CONST } from "@/common/const";
import { useEffect, useRef, useState } from "react";
import LineChart from "./LineChart";

interface LineChartContainerProps {
  setApiQueue: any;
  data: any;
}

const MmLineChartContainer = ({
  setApiQueue,
  data,
}: LineChartContainerProps) => {
  // widget type
  const widgetType = "minute_line";

  // endtime 관리
  const [etime, setEtime] = useState(Date.now());
  const currentEndTimeRef = useRef(etime);
  currentEndTimeRef.current = etime;

  useEffect(() => {
    if (data["today"]) {
      setEtime(data?.["today"].data.etime);
    }
  }, [data["today"]]);

  // 일이 변경되면 어제 데이터를 다시 가져옴 & 오늘 데이터 초기화
  const [todayReset, setTodayReset] = useState(false);
  useEffect(() => {
    setTodayReset(false);
    let etimeDate = new Date(etime).getDate();
    let current = new Date();
    if (etimeDate !== current.getDate()) {
      setTodayReset(true);
      current.setDate(current.getDate() - 1);
      let yesterdayStart = current.setHours(0, 0, 0);
      let yesterdayEnd = current.setHours(23, 59, 59);
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
      ]);
    }
  }, [etime]);

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
        title="THREDA COUNT"
        apiData={data}
        list={["yesterday", "today"]}
        todayReset={todayReset}
      />
    </div>
  );
};

export default MmLineChartContainer;
