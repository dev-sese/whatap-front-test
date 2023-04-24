import { OPEN_API_EMPTY_STRING_KEYS, OPEN_API_RESULT } from "@/common/types";
import { Bar } from "react-chartjs-2";
import {
  barChartBackgroundColor,
  barChartBorderColor,
  barChartBorderWidth,
  barChartOption,
} from "@/components/barChart/BarChartConfig";
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
  apiData: { [key: string]: OPEN_API_RESULT };
  list: string[];
}

const BarChart = ({ title, apiData, list }: BarChartProps) => {
  const changeApiDataToChartData = (apiData: {
    [key: string]: OPEN_API_RESULT;
  }) => {
    // label list로 데이터 정제
    let datasets: number[] = [];
    list.map((key: string) => {
      let data = apiData[key];
      if (data) {
        datasets.push(data.data);
      }
    });

    return {
      labels: list,
      datasets: [
        {
          data: datasets,
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
      data={changeApiDataToChartData(apiData)}
      style={{ width: "300px" }}
    />
  );
};

export default BarChart;
