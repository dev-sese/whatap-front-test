import { BarChartContainer } from "@/components/barChart/BarChartContainer";
import Informatics from "@/components/Informatics";
import type { NextPage } from "next";
import LineChartContainer from "@/components/lineChart/LineChartContainer";
import { useEffect, useState } from "react";
import api from "@/pages/api/openApi";

const Dashboard: NextPage = () => {
  const [apiQueue, setApiQueue] = useState<any>([]);

  useEffect(() => {
    if (apiQueue.length !== 0) {
      let currentQueue = apiQueue;
      let currentApi = currentQueue.slice(0, 1)[0];
      switch (currentApi.type) {
        case "spot":
          api
            .spot(currentApi.key)
            .then((result) => setApiQueue(currentQueue.slice(1)));
          break;
        case "series":
          let today = new Date();
          today.setDate(today.getDate() - 1);
          let yesterdayStart = today.setHours(0, 0, 0);
          let yesterdayEnd = today.setHours(23, 59, 59);
          api
            .series(currentApi.key, {
              stime: yesterdayStart,
              etime: yesterdayEnd,
            })
            .then((result) => setApiQueue(currentQueue.slice(1)));
          break;
      }
    }
  }, [apiQueue]);

  return (
    <main>
      <section>
        <Informatics setApiQueue={setApiQueue} />
      </section>
      <section>
        <BarChartContainer setApiQueue={setApiQueue} />
      </section>
      <section>
        <LineChartContainer setApiQueue={setApiQueue} />
      </section>
    </main>
  );
};

export default Dashboard;
