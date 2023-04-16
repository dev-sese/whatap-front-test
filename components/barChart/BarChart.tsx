import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import { Bar } from "react-chartjs-2";
import {
  barChartBackgroundColor,
  barChartBorderColor,
  barChartBorderWidth,
  barChartOption,
} from "./barChartConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Colors
);

interface BarChartProps {
  title: string;
  apiData: { [key: string]: OPEN_API_RESULT | undefined };
  labels: OPEN_API_EMPTY_STRING_KEYS[];
}

const BarChart = ({ title, apiData, labels }: BarChartProps) => {
  const changeApiDataToChartData = (
    apiData: any,
    labels: OPEN_API_EMPTY_STRING_KEYS[]
  ) => {
    let dataSets: number[] = [];
    labels.map((label: any) => dataSets.push(apiData[label]?.data));
    return {
      labels: labels,
      datasets: [
        {
          data: dataSets,
          backgroundColor: barChartBackgroundColor,
          borderColor: barChartBorderColor,
          borderWidth: barChartBorderWidth,
        },
      ],
    };
  };

  return (
    <Bar
      options={barChartOption(title)}
      data={changeApiDataToChartData(apiData, labels)}
    />
  );
};

export default BarChart;
