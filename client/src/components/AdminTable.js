import React, { useState, useEffect } from "react";
import Message from "./Message";
import Popup from "./Popup";
import DropDown from "./DropDown";

const AdminTable = () => {
  const [popup, setPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [tableData,setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const [agents,setAgents] = useState([]);
  const [compId, setCompId] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState(-1);
  const [assign, setAssign] = useState(false);
  const [submitError,setSubmitError] = useState(false);

  const getComplaints = async() => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    console.log(userId);
    const res = await fetch("http://localhost:9090/getUnresolvedComplaints",{
      method:"GET",
      mode: "cors",
    });
    const response = await res.json(); 
    
    console.log(response);
    setTableData(response);
  }

  const getAgents = async()=>{
    const res = await fetch("http://localhost:9090/getAgents",{
      mode:"cors"
    });
    const agents = await res.json();
    console.log(agents);
    setAgents(agents)

  }

  useEffect(()=>{
    getComplaints();
    getAgents();
  }, []);

  const handleShow = (message) => {
    if(!show)
      setMessage(message);
    setShow((show) => !show);
  }
    
  const popupHandler = ()=>{
    setPopup(false);
  }

  const handleAssign = (complaint) => {
    setCompId(complaint.id);
    setAssign((prev) => !prev);
  }

  const submitAssign = async (e) => {
    e.preventDefault();
    if(selectedAgent === -1) return;

    const res = await fetch("http://localhost:9090/assignAgent",{
      method:"POST",
      mode: "cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        compId, agentId: selectedAgent
      })
    });
    
    const response = await res.json();
    setAssign(false);
    if(response.status === 200) {
      getComplaints();
      setSubmitError(false);
    } else {
      setSubmitError(true);
      alert("Try again later");
    }
    setPopup(true);
    
    setTimeout(()=>{
      setPopup(false);
    }, 3000);
  }

  return (
    <div className={show || assign ? "t-container bdrop" : "t-container"}>
      {show && <Message content={message} handleShow={handleShow} />}
      { assign && <DropDown handleAssign={handleAssign} agents={agents} submitAssign={submitAssign} selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} /> }
      {popup && (
        <Popup
          content={
            submitError ? "Sorry! Something went wrong" : "Agent Assigned successfully"
          }
          type={submitError?"error":"success"}
          popupHandler = {popupHandler}
        />
      )}
      <div className="table-container">
        <div className="header">
          <div>
            <h2>Complaints List</h2>
            <p>List of complaints registered by user</p>
          </div>
        </div>
        <table className="table" cellSpacing="0">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Agent</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((complaint,index)=>{
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{complaint["userName"]}</td>
                  <td>{complaint["subject"]}</td>
                  <td>{complaint["date"].slice(0,16)}</td>
                  {/* <td>{complaint["agent"] || "NA"}</td> */}
                  <td>
                    {
                      complaint["agent"] ? complaint["agentName"] : <button className="msg" onClick={() => handleAssign(complaint)}>Assign</button>
                    }
                  </td>
                  <td>
                    <button className="msg" onClick={()=>{handleShow(complaint["content"])}}>
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {tableData.length==0 && <p className="prompt">No Records found</p>}
      </div>
    </div>
  );
};

export default AdminTable;
