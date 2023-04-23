import {
  BarChartContainer,
  BarChartContainerTest,
} from "@/components/barChart/BarChartContainer";
import Informatics from "@/components/Informatics";
import type { NextPage } from "next";

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
        <BarChartContainerTest
          title={"DB connection"}
          spotKeyList={["dbconn_total", "dbconn_act", "dbconn_idle"]}
        />
      </section>
    </main>
  );
};

export default Dashboard;
