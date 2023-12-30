import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("my-token");
    navigate("/");
  };
  return <button onClick={removeToken}>Logout</button>;
}
