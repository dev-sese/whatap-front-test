import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import { Line } from "react-chartjs-2";
import { lineChartOption } from "@/components/lineChart/LineChartConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface LineChartProps {
  title: string;
  apiData: { [key: string]: OPEN_API_RESULT };
  list: string[];
}

const RealTimeLineChart = ({ title, apiData }: LineChartProps) => {
  const [labelList, setLabelList] = useState<any>([]);
  const [hostData, sethostData] = useState([]);
  const [dataSet, setDataSet] = useState<any>([]);

  const adjustingLength = (prev: any, data: any) => {
    if (prev.length === 120) {
      prev.shift();
      return [...prev, data];
    }
    return [...prev, data];
  };

  // label list로 데이터 정제
  useEffect(() => {
    let data = apiData["cpu"];
    if (data) {
      const currentTime: any = new Date();
      setLabelList((prev: any) =>
        adjustingLength(
          prev,
          `${
            currentTime.getMinutes() < 10
              ? "0" + currentTime.getMinutes()
              : currentTime.getMinutes()
          }:${
            currentTime.getSeconds() < 10
              ? "0" + currentTime.getSeconds()
              : currentTime.getSeconds()
          }`
        )
      );
      setDataSet((prev: any) => adjustingLength(prev, data.data));
    }
  }, [apiData["cpu"]]);

  const changeApiDataToChartData = () => {
    return {
      labels: labelList,
      datasets: [
        {
          label: "cpu",
          data: dataSet,
        },
      ],
    };
  };

  return (
    <Line options={lineChartOption(title)} data={changeApiDataToChartData()} />
  );
};

export default RealTimeLineChart;
