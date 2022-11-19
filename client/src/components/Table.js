import React, { useState, useEffect } from "react";
import Complaint from "./Complaint";
import Message from "./Message";
import Popup from "./Popup";

const initialData = {
  subject: "",
  msg: "",
};

const Table = () => {
  const [popup, setPopup] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [show, setShow] = useState(false);
  const [addComplaint, setAddComplaint] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [tableData,setTableData] = useState([]);
  const [message, setMessage] = useState("");

  const getComplaints = async() => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    console.log(userId);
    const res = await fetch("http://localhost:9090/getcomplaints",{
      method:"POST",
      mode: "cors",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        userId,
      })
    });
    const response = await res.json();
    console.log(response);
    setTableData(response);
  }

  useEffect(()=>{
    getComplaints();
  }, []);

  const changeHandler = (e) => {
    setError({ ...error, [e.target.name]: "" });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleComplaint = () => {
    setData(initialData);
    setAddComplaint((comp) => !comp);
  };
  const handleShow = (message) => {
    if(!show)
      setMessage(message);
    setShow((show) => !show);
  }
    
  const addComplaintHandler = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const complaint = {
      userId,
      subject: data.subject,
      content: data.msg,
    };
    console.log(complaint);
    const res = await fetch("http://localhost:9090/add-complaint", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(complaint),
    });

    const response = await res.json();

    if (response.status === 200) {
      setAddComplaint(false);
      setData(initialData);
      setSubmitError(false);
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 3000);
      getComplaints();
    } else if(response["error"]["database"]){
      setAddComplaint(false);
      setData(initialData);
      setSubmitError(true);
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 3000);
    }else {
      setError(error=>{
        return {...error,...response["error"]}
      });
    }
  };

  const popupHandler = (e)=>{
    setPopup(false);
  }

  return (
    <div className={show ? "t-container bdrop" : "t-container"}>
      {show && <Message content={message} handleShow={handleShow} />}
      {addComplaint && (
        <Complaint
          data={data}
          changeHandler={changeHandler}
          error={error}
          handleComplaint={handleComplaint}
          addComplaintHandler={addComplaintHandler}
        />
      )}
      {popup && (
        <Popup
          content={
            submitError ? "Sorry! Something went wrong" : "Complaint Added successfully"
          }
          type={submitError?"error":"success"}
          popupHandler = {popupHandler}
        />
      )}
      <div className="table-container">
        <div className="header">
          <div>
            <h2>Complaints List</h2>
            <p>Add a new complaint or track complaints already registered.</p>
          </div>
          <button className="new-complaint" onClick={handleComplaint}>
            <i className="fas fa-plus"></i>
            Add New Complaint
          </button>
        </div>
        <table className="table" cellSpacing="0">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Agent</th>
              <th>Status</th>
              <th>Message</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((complaint,index)=>{
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{complaint["subject"]}</td>
                  <td>{complaint["date"].slice(0,16)}</td>
                  <td>{complaint["agent"] || "NA"}</td>
                  <td>
                    <button className={complaint["status"]==0?"status-n":"status-a"}>{complaint["status"]==0?"Under Processing":"Completed"}</button>
                  </td>
                  <td>
                    <button className="msg" onClick={()=>{handleShow(complaint["content"])}}>
                      View
                    </button>
                  </td>
                  <td>
                    <button className="msg" onClick={()=>{handleShow(complaint["feedback"] || "No Feedback yet")}}>
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
            
            {/* <tr>
              <td>2</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>
                <button className="status-n">Not Assigned</button>
              </td>
              <td>
                <button className="msg" onClick={handleShow}>
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>
                <button className="status-a">Assigned</button>
              </td>
              <td>
                <button className="msg" onClick={handleShow}>
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>
                <button className="status-n">Not Assigned</button>
              </td>
              <td>
                <button className="msg" onClick={handleShow}>
                  View
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
