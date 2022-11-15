import React from "react";

const Table = () => {
  return (
    <div className="container">
      <div className="table-container">
        <div className="header">
          <div>
            <h2>Complaints List</h2>
            <p>Add a new complaint or track complaints already registered.</p>
          </div>
          <button>
            <i className="fas fa-plus"></i>
            Add New Complaint
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Agent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>sjs</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>sjs</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>sjs</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Thsh</td>
              <td>12/09/2002</td>
              <td>jshs</td>
              <td>sjs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
