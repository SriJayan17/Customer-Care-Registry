import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AgentTable from "./AgentTable";

const Agent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      navigate("/");
    } else {
      if (user["agentId"] === undefined) navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <AgentTable />
    </>
  );
};

export default Agent;
