import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar"
import AgentTable from "./AgentTable"

const Agent = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user===null){
      navigate("/login");
    }else{
      if(user["agentId"]===undefined)
        navigate("/login");
    }
  }, [])
  return (
    <>
        <Navbar/>
        <AgentTable/>
    </>
  )
}

export default Agent