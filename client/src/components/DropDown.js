import React from 'react'

const DropDown = ({handleAssign, agents, submitAssign, selectedAgent, setSelectedAgent}) => {

  return (
    <div className="wrapper">
      <div className="complaint">
        <i className="fas fa-times" onClick={handleAssign}></i>
        <h3>Assign a agent</h3>

          <form className="assignForm">
            <select name="agent" id="agent" onChange={(e) => setSelectedAgent(e.target.value)} required>
              {
                agents.map((agent,index) => {
                  return <option key={index} value={agent.id}>{agent.name}</option>
                })
              }
            </select>
            
            <button type="submit" onClick={submitAssign}>Assign</button>
          </form>

      </div>
    </div>
  )
}
{/* <option value="Rajesh">Rajesh</option>
              <option value="Sri Jayan">Sri Jayan</option>
              <option value="Junaid">Junaid</option>
              <option value="Ravi">Ravi</option> */}
export default DropDown;