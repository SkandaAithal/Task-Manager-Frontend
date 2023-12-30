import axios from "axios";
import React, { useEffect, useState } from "react";
import AllTaskStyle from "../css/alltasks.module.css";
import { useNavigate } from "react-router-dom";

export default function AllTasks() {
  let [userTask, setUserTask] = useState({});
  let navigateTo = useNavigate();
  let token = localStorage.getItem("my-token");
  let getApidata = async () => {
    try {
      let { data } = await axios.get(
        "http://localhost:3900/tasks/getalltasks",
        {
          headers: {
            authorization: token,
          },
        }
      );
      setUserTask(data);
      console.log(data);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message === "token is required") {
        navigateTo("/");
      }
    }
  };
  useEffect(() => {
    getApidata();
  }, []);

  let deleteTask = async (id) => {
    try {
      console.log(token);
      console.log(id);
      await axios.delete(`http://localhost:3900/tasks/deletetask/${id}`, {
        headers: {
          authorization: token,
        },
      });

      getApidata();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={AllTaskStyle.cards}>
      {userTask?.tasks?.map(({ priority, taskName, _id }, index) => {
        return (
          <div key={_id} className={AllTaskStyle.card}>
            <h1>
              Task Name : <span id={AllTaskStyle.head}>{taskName}</span>
            </h1>
            <h3>Priority : {priority}</h3>
            <button
              onClick={() => {
                navigateTo(`/tasks/singletask/${_id}`);
              }}
            >
              View Task
            </button>
            <button
              onClick={() => {
                navigateTo(`/tasks/updatetask/${_id}`);
              }}
            >
              Update Task
            </button>

            <button
              onClick={() => {
                deleteTask(_id);
              }}
            >
              Delete Task
            </button>
          </div>
        );
      })}
    </div>
  );
}
