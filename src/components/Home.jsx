import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeStyles from "../css/home.module.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  let [user, setUser] = useState({});
  let navigateToAddTask = useNavigate();
  let getApidata = async () => {
    try {
      let token = localStorage.getItem("my-token");
      let { data } = await axios.get("http://localhost:3900/users/singleuser", {
        headers: {
          Authorization: token,
        },
      });
      setUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "token is required") {
        navigateToAddTask("/");
      }
    }
  };

  console.log();
  useEffect(() => {
    getApidata();
  }, []);
  return (
    <div className={HomeStyles.card}>
      <h1>welcome! {user?.singleuser?.fullname}</h1>
      <p>You Can add you tasks and give them priority</p>
      <button
        onClick={() => {
          navigateToAddTask("/tasks/addtask");
        }}
      >
        GO ADD YOUR TASK
      </button>
    </div>
  );
}
