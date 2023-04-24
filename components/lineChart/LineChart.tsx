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

interface BarChartProps {
  title: string;
  apiData: number;
  labels?: OPEN_API_EMPTY_STRING_KEYS[];
}

const LineChart = ({ title, apiData, labels }: BarChartProps) => {
  const [labelList, setLabelList] = useState<any>([]);
  const [dataSet, setDataSet] = useState<any>([]);

  useEffect(() => {
    if (apiData) {
      const currentTime: any = new Date();
      setLabelList((prev: any) =>
        adjustingLength(
          prev,
          `${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        )
      );
      setDataSet((prev: any) => adjustingLength(prev, apiData));
    }
  }, [apiData]);

  const adjustingLength = (prev: any, apiData: any) => {
    if (prev.length === 120) {
      prev.shift();
      return [...prev, apiData];
    }
    return [...prev, apiData];
  };

  const changeApiDataToChartData = () => {
    return {
      labels: labelList,
      datasets: [
        {
          data: dataSet,
        },
      ],
    };
  };

  return (
    <Line options={lineChartOption(title)} data={changeApiDataToChartData()} />
  );
};

export default LineChart;
