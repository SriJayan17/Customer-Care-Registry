import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const initialData = {
  name: "",
  email: "",
  password: "",
  mno: "",
  type:1,
};
const initialError = {
  name: "",
  email: "",
  password: "",
  mno: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialData);
  const [errorData, setErrorData] = useState(initialError);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setErrorData({ ...errorData, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const submitHandler = async (e) => {
    
    e.preventDefault();

    const fdata = formData;

    if(fdata["type"]==='1' || fdata['type'] === 1)
      fdata["type"] = 1;
    else
      fdata["type"] = 2;

    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fdata),
    });

    const data = await response.json();
    console.log(data, data.status);
    if (data.status != 200) {
      setErrorData(data.error);
    } else {
      setFormData(initialData);
      if(data["user"]["agentId"]){
        navigate("/agent");
        localStorage.setItem("user",JSON.stringify(data["user"]))  
      }else{
        navigate("/dashboard");
        localStorage.setItem("user",JSON.stringify(data["user"]))  
      }
    }
  };
  return (
    <div className="login">
      <div id="left-section"></div>
      <div id="right-section">
        <h2>Registeration Form</h2>
        <form action="#" method="POST">
          <Input
            features={{
              type: "text",
              name: "name",
              id: "name",
              label: "Full Name",
              data: formData.name,
              changeHandler: changeHandler,
              error: errorData.name,
            }}
          ></Input>
          <Input
            features={{
              type: "email",
              name: "email",
              id: "email",
              label: "E-mail",
              data: formData.email,
              changeHandler: changeHandler,
              error: errorData.email,
            }}
          ></Input>
          <Input
            features={{
              type: "password",
              name: "password",
              id: "password",
              label: "Password",
              data: formData.password,
              changeHandler: changeHandler,
              error: errorData.password,
            }}
          ></Input>
          <Input
            features={{
              type: "tel",
              name: "mno",
              id: "mno",
              label: "Mobile Number",
              data: formData.mno,
              changeHandler: changeHandler,
              error: errorData.mno,
            }}
          ></Input>
          <div className="form-details">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" onChange={changeHandler} className="user-type">
              <option value={1}>User</option>
              <option value={2}>Agent</option>
            </select>
          </div>
          <button type="submit" onClick={submitHandler}>
            Register
          </button>
          <p>
            Already a user? &nbsp;
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
