import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AdminTable from "./AdminTable";

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      navigate("/");
    } else {
      if (user["adminId"] === undefined) navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <AdminTable />
    </>
  );
};

export default AdminDashboard;
