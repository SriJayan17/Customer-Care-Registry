import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Table from "./Table";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      navigate("/");
    } else {
      console.log(user);
      if (user["userId"] === undefined) navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Table />
    </>
  );
};

export default Dashboard;
