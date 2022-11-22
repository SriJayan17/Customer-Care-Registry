import React, { useState, useEffect } from "react";
import Message from "./Message";
import Popup from "./Popup";
import DropDown from "./DropDown";
import Process from "./Process";
import Feedback from "./Feedback";

const AgentTable = () => {
  const [popup, setPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [tableData,setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(false);

  const [data, setData] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const [status, setStatus] = useState([]);
  const [compId, setCompId] = useState(0);


  const getComplaints = async() => {
    const agentId = JSON.parse(localStorage.getItem("user")).agentId;
    console.log(agentId)
    const res = await fetch("http://localhost:9090/getAssignedTask",{
      method:"POST",
      mode: "cors",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        agentId: agentId
      })
    });
    const response = await res.json(); 
    
    console.log(response);
    const s = response.map(complaint=>{
      return complaint["status"]
    })
    setStatus(s);
    setTableData(response);
  }


  useEffect(()=>{
    getComplaints();
  }, []);

  const handleShow = (message) => {
    if(!show)
      setMessage(message);
    setShow((show) => !show);
  }
    
  const popupHandler = ()=>{
    setPopup(false);
  }

  const changeHandler = (e) => {
    setData(e.target.value);
  }

  const feedbackClickHandler = (id) => {
    setCompId(id);
    setFeedback(true);
  }

  const feedbackSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:9090/addFeedback",{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        compId:compId,
        feedback: data
      })
    })
    const response = await res.json()
    console.log(response)
    if(response.status !== 200) {
      setSubmitError(true);
    }
    
    setFeedback(false);
    setData("");
    setPopup(true);
    
    setTimeout(()=>{
      setPopup(false);
      setSubmitError(false);
    }, 3000);
  }

  const resolveHandler = async (index)=>{
    setCompId(tableData[index]["id"]);
    const res = await fetch("http://localhost:9090/toggleStatus",{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        agentId:JSON.parse(localStorage.getItem("user")).agentId,
        compId:tableData[index]["id"]
      })
    })
    const response = await res.json();
    console.log(response);
    if (response["status"]==200){
      setStatus(status=>{
        const temp = new Array(status);
        temp[index] = true;
        return temp;
      })
    }

  }
  return (
    <div className={show ? "t-container bdrop" : "t-container"}>
      {show && <Message content={message} handleShow={handleShow} />}
      {feedback && <Feedback data={data} changeHandler={changeHandler} setFeedback={setFeedback}feedbackSubmitHandler={feedbackSubmitHandler} /> }

      {popup && (
        <Popup
          content={
            submitError ? "Sorry! Something went wrong" : "Feedback sent successfully"
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
              <th>Message</th>
              <th>Feedback</th>
              <th>Action</th>
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
                  <td>
                    <button className="msg" onClick={()=>{handleShow(complaint["content"])}}>
                      View
                    </button>
                  </td>
                  <td>
                    <button className="msg" onClick={() => feedbackClickHandler(complaint["id"])}>
                      View
                    </button>
                  </td>
                  <td>
                    <button className={status[index] ? "msg green" : "msg"} onClick={() => resolveHandler(index)} >
                        {
                            status[index] ? <>Resolved</> : <>Resolve</>
                        }
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

export default AgentTable;
