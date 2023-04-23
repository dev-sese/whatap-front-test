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
  labelData: any;
  yesterdayData: any;
  todayData: any;
}

const LineChartTest = ({
  title,
  labelData,
  yesterdayData,
  todayData,
}: BarChartProps) => {
  const adjustingLength = (prev: any, apiData: any) => {
    if (prev.length === 20) {
      prev.shift();
      return [...prev, apiData];
    }
    return [...prev, apiData];
  };

  const changeApiDataToChartData = () => {
    return {
      labels: labelData,
      datasets: [
        {
          label: "yesterday",
          data: yesterdayData,
        },
        {
          label: "today",
          data: todayData,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    };
  };

  return (
    <Line
      options={lineChartOption("line chart")}
      data={changeApiDataToChartData()}
    />
  );
};

export default LineChartTest;
