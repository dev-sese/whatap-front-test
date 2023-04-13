import Informatics from "@/components/Informatics";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <main>
      <Informatics spotKey="act_agent" />
      <Informatics spotKey="inact_agent" />
      <Informatics spotKey="tps" />
      <Informatics spotKey="tps" />
      <Informatics spotKey="cpu" />
    </main>
  );
};

export default Dashboard;
