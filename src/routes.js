import React from "react";
import SignUp from "./components/SignUp";
import Mytasks from "./components/Mytasks";
import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import AllTasks from "./components/AllTasks";
import AddTask from "./components/AddTask";
import SingleTask from "./components/SingleTask";
import UpdateTask from "./components/UpdateTask";
import Authentication from "./components/Authentication";

export default function Router() {
  let app = useRoutes([
    { path: "/", element: <Authentication /> },
    { path: "/signup", element: <SignUp /> },
    {
      path: "/tasks",
      element: <Mytasks />,
      children: [
        { path: "home", element: <Home /> },
        { path: "alltasks", element: <AllTasks /> },

        { path: "addtask", element: <AddTask /> },
        { path: "singletask/:id", element: <SingleTask /> },
        { path: "updatetask/:id", element: <UpdateTask /> },
      ],
    },
  ]);
  return app;
}
