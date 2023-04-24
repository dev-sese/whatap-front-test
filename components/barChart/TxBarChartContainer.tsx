import { INTERVAL_S5_TIME_CONST } from "@/common/const";
import { useEffect } from "react";
import BarChart from "@/components/barChart/BarChart";

interface BarChartContainerProps {
  setApiQueue: any;
  data: any;
}

const TxBarChartContainer = ({ setApiQueue, data }: BarChartContainerProps) => {
  // widget type
  const widgetType = "txcount_db";

  // interval
  const intervalApiCall = () => {
    setTimeout(() => {
      setApiQueue((prev: any) => [
        ...prev,
        { key: "txcount", type: "spot", widget: widgetType },
        { key: "actx", type: "spot", widget: widgetType },
      ]);
      intervalApiCall();
    }, INTERVAL_S5_TIME_CONST);
  };

  // 첫 호출
  useEffect(() => {
    setApiQueue((prev: any) => [
      ...prev,
      { key: "txcount", type: "spot", widget: widgetType },
      { key: "actx", type: "spot", widget: widgetType },
    ]);
    intervalApiCall();
  }, []);

  return (
    <div>
      <BarChart
        title={"TRANSECTION"}
        apiData={data}
        list={["txcount", "actx"]}
      />
    </div>
  );
};

export default TxBarChartContainer;
