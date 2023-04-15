import Informatics from "@/components/Informatics";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <main>
      <section>
        <Informatics spotKey="act_agent" />
        <Informatics spotKey="inact_agent" />
      </section>
    </main>
  );
};

export default Dashboard;
