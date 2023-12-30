import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Mytasks() {
  return (
    <div>
      <Navbar
        data={[
          { key: "Home", url: "/tasks/home" },
          { key: "All Tasks", url: "/tasks/alltasks" },
          { key: "Add Task", url: "/tasks/addtask" },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default Mytasks;
