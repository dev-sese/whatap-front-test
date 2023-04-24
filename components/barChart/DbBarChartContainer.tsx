import { INTERVAL_S5_TIME_CONST } from "@/common/const";
import { useEffect } from "react";
import BarChart from "@/components/barChart/BarChart";

interface BarChartContainerProps {
  setApiQueue: any;
  data: any;
}

const DbBarChartContainer = ({ setApiQueue, data }: BarChartContainerProps) => {
  // widget type
  const widgetType = "bar_db";

  // interval
  const intervalApiCall = () => {
    setTimeout(() => {
      setApiQueue((prev: any) => [
        ...prev,
        { key: "dbconn_total", type: "spot", widget: widgetType },
        { key: "dbconn_act", type: "spot", widget: widgetType },
        { key: "dbconn_idle", type: "spot", widget: widgetType },
      ]);
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
