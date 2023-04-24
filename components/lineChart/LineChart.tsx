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
  apiData: { series: number[][] }[] | [];
  labels?: OPEN_API_EMPTY_STRING_KEYS[];
}

const LineChart = ({ title, apiData, labels }: BarChartProps) => {
  const getLabelData = (firstDataList: { series: number[][] }[] | []) => {
    if (firstDataList.length === 0) {
      return [];
    }
    let seriesData = firstDataList?.length !== 0 ? firstDataList[0].series : [];
    let chartLabelData = [];
    for (let i = 0; i < seriesData.length; i++) {
      let time = new Date(seriesData[i][0]);
      chartLabelData.push(
        `${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:${
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
        }`
      );
    }
    return chartLabelData;
  };

  const getData = (firstDataList: any) => {
    if (firstDataList?.length === 0) {
      return [];
    }
    let seriesData = firstDataList[0].series;
    let chartData = [];
    for (let i = 0; i < seriesData.length; i++) {
      chartData.push(seriesData[i][1]);
    }
    return chartData;
  };
  const changeApiDataToChartData = () => {
    return {
      labels: getLabelData(apiData),
      datasets: [
        {
          label: "yesterday",
          data: getData(apiData),
        },
        // {
        //   label: "today",
        //   data: todayData,
        //   borderColor: "rgb(54, 162, 235)",
        //   backgroundColor: "rgba(54, 162, 235, 0.2)",
        //   fill: true,
        // },
      ],
    };
  };

  return (
    <Line options={lineChartOption(title)} data={changeApiDataToChartData()} />
  );
};

export default LineChart;
