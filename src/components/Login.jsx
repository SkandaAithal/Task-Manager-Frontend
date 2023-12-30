import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginStyles from "../css/login.module.css";
import axios from "axios";
function Login({ fdata, setfdata, setisVerify }) {
  let [errorMessage, setErrorMessage] = useState({ error: false, message: "" });

  function validation({ target: { name, value } }) {
    setfdata({ ...fdata, [name]: value });
  }
  async function loginSubmit(e) {
    try {
      e.preventDefault();
      let { data } = await axios.post(
        "http://localhost:3900/users/login",
        fdata
      );
      setErrorMessage({ error: data.error, message: data.message });
      console.log(data);

      setisVerify(true);
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  }
  return (
    <div className={LoginStyles.wrapper}>
      <form className={LoginStyles.form} onSubmit={loginSubmit}>
        <h1>Login...</h1>
        <h3>
          {errorMessage.error ? errorMessage.message : errorMessage.message}
        </h3>

        <div className={LoginStyles.div}>
          <h3>Email or Mobile</h3>
          <input
            type="text"
            name="firstfield"
            placeholder="Email or Mobile"
            onChange={validation}
          />
        </div>
        <div className={LoginStyles.div}>
          <h3>Password</h3>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={validation}
          />
        </div>
        <button type="submit">Login</button>

        <Link to="/signup">Not logged in? signUp</Link>
      </form>
    </div>
  );
}

export default Login;
