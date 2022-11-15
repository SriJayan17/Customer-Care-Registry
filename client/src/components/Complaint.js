import React from 'react'
import Input from './Input'

const Complaint = ({data, changeHandler, error, handleComplaint}) => {
  return (
    <div className='complaint'>
        <i className="fas fa-times" onClick={handleComplaint}></i>
        <h3>Add New Complaint</h3>
        <form>
            <Input
                features={{
                type: "text",
                name: "subject",
                id: "subject",
                label: "Subject",
                data: data.subject,
                changeHandler: changeHandler,
                error: error.subject,
            }}
            ></Input>
            <Input
                features={{
                type: "text",
                name: "msg",
                id: "msg",
                label: "Message",
                data: data.msg,
                changeHandler: changeHandler,
                error: error.msg,
            }}
            ></Input>

            <button>Add</button>
        </form>
    </div>
  )
}

export default Complaint