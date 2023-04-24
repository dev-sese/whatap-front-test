import {
  BarChartContainer,
  BarChartContainerTest,
} from "@/components/barChart/BarChartContainer";
import Informatics from "@/components/Informatics";
import type { NextPage } from "next";
import LineChartContainer from "@/components/lineChart/LineChartContainer";
import LineChartContainerTest from "@/components/lineChart/LineChartContainerTest";

const Dashboard: NextPage = () => {
  return (
    <main>
      <section>
        <Informatics spotKey="act_agent" />
      </section>
      <section>
        <BarChartContainer
          title={"트렌젝션"}
          spotKeyList={["txcount", "actx"]}
        />
        <BarChartContainer
          title={"DB connection"}
          spotKeyList={["dbconn_total", "dbconn_act", "dbconn_idle"]}
        />
        {/* <BarChartContainerTest
          title={"DB connection"}
          spotKeyList={["dbconn_total", "dbconn_act", "dbconn_idle"]}
        /> */}
        <LineChartContainer title={"DB connection"} spotKey={"txcount"} />
        <LineChartContainerTest
          title={"transaction"}
          spotKey={"transaction/{stime}/{etime}"}
        />
      </section>
    </main>
  );
};

export default Dashboard;
