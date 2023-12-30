import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleTaskStyle from "../css/singletask.module.css";
export default function SingleTask() {
  let { id } = useParams();
  let [userTask, setUserTask] = useState({});
  let getApidata = async () => {
    try {
      let token = localStorage.getItem("my-token");
      let { data } = await axios.get(
        `http://localhost:3900/tasks/singletask/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUserTask(data.task);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getApidata();
  }, []);
  console.log(userTask);
  return (
    <div className={SingleTaskStyle.wrapper}>
      <div className={SingleTaskStyle.card}>
        <div className={SingleTaskStyle.div}>
          <h1> Your Task :</h1>
          <p id={SingleTaskStyle.task}>{userTask.taskName}</p>
        </div>
        <div className={SingleTaskStyle.div}>
          <h1>Description :</h1>
          <p>{userTask.taskDescription}</p>
        </div>
        <div className={SingleTaskStyle.div}>
          <h1>Priority :</h1>
          <p>{userTask.priority}</p>
        </div>
      </div>
    </div>
  );
}
