import React, { useEffect, useState } from "react";

import LoginStyles from "../css/login.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
export default function UpdateTask() {
  let navigate = useNavigate();
  let token = localStorage.getItem("my-token");
  let [issucces, setsucces] = useState({ error: true });
  let [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    priority: "",
  });
  let { id } = useParams();
  let getDatafromDB = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:3900/tasks/singletask/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTask(data.task);
    } catch (err) {}
  };
  useEffect(() => {
    getDatafromDB();
  }, []);
  let getData = ({ target: { name, value } }) => {
    setTask({ ...task, [name]: value });
    console.log(task);
  };
  async function updateTask(e) {
    try {
      e.preventDefault();
      console.log(task);
      let { data } = await axios.post(
        `http://localhost:3900/tasks/updatetask/${id}`,
        task,
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(data);
      setsucces(data);
      setTimeout(() => {
        navigate("/tasks/alltasks");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={LoginStyles.wrapper}>
      {issucces.error || (
        <h1 className={LoginStyles.msg}>{issucces.message} </h1>
      )}
      <form className={LoginStyles.form} onSubmit={updateTask}>
        <h1>Update Task</h1>

        <div className={LoginStyles.div}>
          <h3>Task Name :</h3>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            onChange={getData}
            value={task.taskName}
          />
        </div>
        <div className={LoginStyles.div}>
          <h3>Task Description :</h3>
          <input
            type="text"
            name="taskDescription"
            placeholder="Description"
            onChange={getData}
            value={task.taskDescription}
          />
        </div>
        <div className={LoginStyles.div}>
          <h3>Priority :</h3>
          <input
            type="text"
            name="priority"
            placeholder="priority"
            onChange={getData}
            value={task.priority}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}
