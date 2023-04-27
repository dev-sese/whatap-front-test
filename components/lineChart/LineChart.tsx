import { OPEN_API_RESULT } from "@/common/types";
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

const LineChart = ({ title, apiData }: LineChartProps) => {
  // 데이터 관리
  const [yesterdayData, setYesterdayData] = useState(apiData["yesterday"]);
  const [todayData, setTodayData] = useState([]);

  // 데이터 정제
  const getDailyData = (dailyData: OPEN_API_RESULT | undefined) => {
    let seriesData = dailyData?.data.objects[0].series;
    let chartData = [];
    for (let i = 0; i < seriesData?.length; i++) {
      chartData.push(seriesData[i][1]);
    }
    return chartData;
  };

  // 라벨 정제
  const getLabelData = (yesterdayData: OPEN_API_RESULT | undefined) => {
    let seriesData = yesterdayData?.data.objects[0].series;
    let chartLabelData = [];
    for (let i = 0; i < seriesData?.length; i++) {
      let time = new Date(seriesData[i][0]);
      chartLabelData.push(
        `${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:${
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
        }`
      );
    }
    return chartLabelData;
  };

  useEffect(() => {
    if (apiData["yesterday"]) {
      setYesterdayData(apiData["yesterday"]);
    }
  }, [apiData["yesterday"]]);

  // 오늘 데이터 변경되면 정제해서 업데이트
  useEffect(() => {
    if (apiData["today"]) {
      setTodayData((prev: any) => prev.concat(getDailyData(apiData["today"])));
    }
  }, [apiData["today"]]);

  // 차트 데이터로 가공
  const changeApiDataToChartData = () => {
    return {
      labels: getLabelData(yesterdayData),
      datasets: [
        {
          label: "yesterday",
          data: getDailyData(yesterdayData),
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
    <Line options={lineChartOption(title)} data={changeApiDataToChartData()} />
  );
};

export default LineChart;
