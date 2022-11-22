import React from "react";
import Input from "./Input";

const Feedback = ({data, changeHandler, setFeedback, feedbackSubmitHandler}) => {
  return (
    <div className="wrapper">
      <div className="complaint">
        <i className="fas fa-times" onClick={() => setFeedback(false)}></i>
        <h3>Add Feedback</h3>
        <form>
          <Input
            features={{
              type: "text",
              name: "feedback",
              id: "feedback",
              label: "Feedback",
              data: data,
              changeHandler: changeHandler,
            }}
          ></Input>

          <button onClick={feedbackSubmitHandler}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
