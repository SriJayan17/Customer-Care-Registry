import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const initialData = {
  email: "",
  password: "",
};

const initialError = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialData);
  const [errorData, setErrorData] = useState(initialError);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setErrorData({ ...errorData, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data, data.status);
    if (data.status != 200) {
      setErrorData(data.error);
    } else {
      setFormData(initialData);
      navigate("/");
    }
  };

  return (
    <div className="login">
      <div id="left-section"></div>
      <div id="right-section">
        <h2>Login Form</h2>
        <form action="#" method="POST">
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
          <button type="submit" onClick={submitHandler}>
            Login
          </button>
          <p>
            New user? &nbsp;
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
