import React, { useState } from "react";

import LoginStyles from "../css/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddTask() {
  let navigate = useNavigate();
  let token = localStorage.getItem("my-token");
  let [issucces, setsucces] = useState({ error: true });
  let [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    priority: "",
  });
  let getData = ({ target: { name, value } }) => {
    setTask({ ...task, [name]: value });
    console.log(task);
  };
  async function addTask(e) {
    try {
      e.preventDefault();
      console.log(task);
      let { data } = await axios.post(
        "http://localhost:3900/tasks/addtask",
        task,
        {
          headers: {
            authorization: token,
          },
        }
      );

      setsucces(data);
      setTimeout(() => {
        navigate("/tasks/alltasks");
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "token is required") {
        navigate("/");
      }
    }
  }
  console.log(issucces.error);
  return (
    <div className={LoginStyles.wrapper}>
      {issucces.error || (
        <h1 className={LoginStyles.msg}>{issucces.message} </h1>
      )}
      <form className={LoginStyles.form} onSubmit={addTask}>
        <h1>Add Task</h1>

        <div className={LoginStyles.div}>
          <h3>Task Name :</h3>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            onChange={getData}
          />
        </div>
        <div className={LoginStyles.div}>
          <h3>Task Description :</h3>
          <input
            type="text"
            name="taskDescription"
            placeholder="Description"
            onChange={getData}
          />
        </div>
        <div className={LoginStyles.div}>
          <h3>Priority :</h3>
          <input
            type="text"
            name="priority"
            placeholder="priority"
            onChange={getData}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
