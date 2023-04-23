import { INTERVAL_TIME_CONST } from "@/common/const";
import {
  OPEN_API_EMPTY_STRING_KEYS,
  OPEN_API_JSON_KEYS,
  OPEN_API_RESULT,
} from "@/common/types";
import api from "@/pages/api/openApi";
import { useEffect, useRef, useState } from "react";
import LineChart from "./LineChart";
import LineChartTest from "./LineChartTest";

interface LineChartContainerProps {
  title: string;
  spotKey: OPEN_API_JSON_KEYS;
}

const LineChartContainerTest = ({
  title,
  spotKey,
}: LineChartContainerProps) => {
  const [labelData, setLabelData] = useState<any>();
  const [yesterdayData, setYesterdayData] = useState<any>();
  const [todayData, setTodayData] = useState<any>();

  const [endTime, setEndTime] = useState<number>(Date.now());
  const currentEndTimeRef = useRef(endTime);
  currentEndTimeRef.current = endTime;

  const changeYesterdayFirstDataToChartData = (firstDataList: any) => {
    let chartLabelData = [];
    let chartData = [];
    for (let i = 0; i < firstDataList.length; i++) {
      let time = new Date(firstDataList[i][0]);
      chartLabelData.push(
        `${
          time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
        }:${time.getMinutes()}`
      );
      chartData.push(firstDataList[i][1]);
    }
    setLabelData(chartLabelData);
    setYesterdayData(chartData);
  };

  const changeTodayFirstDataToChartData = (firstDataList: any) => {
    let chartData = [];
    for (let i = 0; i < firstDataList.length; i++) {
      chartData.push(firstDataList[i][1]);
    }
    setTodayData(chartData);
  };

  const intevalApiCallYesterday = (key: OPEN_API_JSON_KEYS) => {
    let today = new Date();
    today.setDate(today.getDate() - 1);
    let yesterdayStart = today.setHours(0, 0, 0);
    let yesterdayEnd = today.setHours(23, 59, 59);
    // 첫 호출시 바로 실행되는 함수
    setTimeout(() => {
      api
        .series("thread_count/{stime}/{etime}/1387800924", {
          stime: yesterdayStart,
          etime: yesterdayEnd,
        })
        .then((result) =>
          changeYesterdayFirstDataToChartData(result.data.objects[0].series)
        );
    }, 10);
  };

  const intevalApiCall = (key: OPEN_API_JSON_KEYS) => {
    let today = new Date();
    let todayStart = today.setHours(0, 0, 0);
    // 첫 호출시 바로 실행되는 함수
    setTimeout(() => {
      api
        .series("thread_count/{stime}/{etime}/1387800924", {
          stime: todayStart,
          etime: endTime,
        })
        .then((result) =>
          changeTodayFirstDataToChartData(result.data.objects[0].series)
        );
    }, 10);
    // 정해진 간격으로 실행되는 함수
    const afterDelayApiCall = () => {
      let etime = Date.now();
      console.log(currentEndTimeRef.current, etime);
      setTimeout(() => {
        api
          .series("thread_count/{stime}/{etime}/1387800924", {
            stime: currentEndTimeRef.current,
            etime: etime,
          })
          .then((result) => {
            setTodayData((prev: any) => [
              ...prev,
              result.data.objects[0].series[0][1],
            ]);
          });

        afterDelayApiCall();
      }, 300000);
      setEndTime(etime);
    };
    afterDelayApiCall();
  };

  useEffect(() => {
    intevalApiCall(spotKey);
    intevalApiCallYesterday(spotKey);
  }, []);

  return (
    <div>
      <LineChartTest
        title="line chart"
        labelData={labelData}
        yesterdayData={yesterdayData}
        todayData={todayData}
      />
    </div>
  );
};

export default LineChartContainerTest;
