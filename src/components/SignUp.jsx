import React, { useState } from "react";
import SignUpStyles from "../css/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
  let [fdata, setfdata] = useState({
    fullname: "",
    mobile: "",
    password: "",
    confirmpwd: "",
    email: "",
    gender: "",
    skills: [],
  });
  let [apiError, setApiError] = useState({});
  let [errors, setErrors] = useState({});
  let navihateToLogin = useNavigate();
  function confirmPassword(value) {
    if (fdata.password !== value) {
      return { confirmpwd: "password is not matching", password: "" };
    } else {
      return { confirmpwd: "" };
    }
  }
  function validation(name, value) {
    if (name === "fullname") {
      if (!value) {
        return { fullname: "Name is empty" };
      } else if (!/^[A-Za-z\s]+$/g.test(value)) {
        return { fullname: "Name should contain only alphabets" };
      } else {
        return { fullname: "" };
      }
    } else if (name === "email") {
      if (!value) {
        return { email: "email is empty" };
      } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        return { email: "email is not in right format" };
      } else {
        return { email: "" };
      }
    } else if (name === "password") {
      if (!value) {
        return { password: "password is empty" };
      } else if (value.length < 8) {
        return { password: "password should more than 8 characters" };
      } else if (!/^[A-Za-z0-9\@!#$%&*^?]+$/.test(value)) {
        return { password: "password is not in right format" };
      } else {
        if (value !== fdata.confirmpwd) {
          return { confirmpwd: "password is not matching", password: "" };
        } else {
          return { confirmpwd: "" };
        }
      }
    } else if (name === "confirmpwd") {
      if (!value) {
        return { confirmpwd: "password is empty" };
      } else if (!fdata.password) {
        return { confirmpwd: "password should be filled first" };
      } else {
        return confirmPassword(value);
      }
    } else if (name === "mobile") {
      if (!value) {
        return { mobile: "Mobile is empty" };
      } else if (!/^[6-9][0-9]{9}$/.test(value)) {
        return { mobile: "mobile should contain only 10 numbers" };
      } else {
        return { mobile: "" };
      }
    } else if (name === "gender") {
      if (!value) {
        return { gender: "gender is empty" };
      } else {
        return { gender: "" };
      }
    } else if (name === "skills") {
      if (!value) {
        return { skills: "skills is mandatory" };
      } else {
        return { skills: "" };
      }
    }
  }

  function getValue({ target: { name, value, checked } }) {
    if (name == "skills") {
      if (checked) {
        setfdata({ ...fdata, skills: [...fdata.skills, value] });
      } else {
        setfdata({
          ...fdata,
          skills: fdata.skills.filter((skill) => skill !== value),
        });
      }
    } else {
      setfdata({ ...fdata, [name]: value });
    }

    let returnedErrorObject = validation(name, value);
    setErrors({ ...errors, ...returnedErrorObject });
  }
  async function submitData(e) {
    try {
      e.preventDefault();

      if (
        Object.values(errors).every((emsg) => emsg === "") &&
        Object.values(fdata).every((data) => data !== "")
      ) {
        let { data } = await axios.post("http://localhost:3900/users/signup", {
          fullname: fdata.fullname,
          email: fdata.email,
          password: fdata.confirmpwd,
          mobile: fdata.mobile,
          skills: fdata.skills,
          gender: fdata.gender,
        });

        setApiError(data);
        setfdata({
          fullname: "",
          mobile: "",
          password: "",
          confirmpwd: "",
          email: "",
          gender: "",
          skills: [],
        });
        navihateToLogin("/");
      } else {
        for (const key in fdata) {
          if (fdata[key] === "") {
            setErrors((prev) => {
              return { ...prev, [key]: `${key} is empty` };
            });
          }
        }
        console.log(errors);
        console.log("form not submitted");
      }
    } catch (err) {
      console.log(err.response.data);
      setApiError(err.response.data);
    }
  }
  return (
    <div>
      <form method="POST" onSubmit={submitData} className={SignUpStyles.form}>
        <h1>SignUp form</h1>
        <h2> {apiError.error && apiError.message}</h2>
        <div className={SignUpStyles.div}>
          <h3>FullName</h3>
          <input
            type="text"
            placeholder="Name"
            name="fullname"
            onChange={getValue}
            value={fdata.fullname}
          />
          <p> {errors.fullname && errors.fullname}</p>
        </div>
        <div className={SignUpStyles.div}>
          <h3>Email</h3>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={getValue}
            value={fdata.email}
          />
          <p> {errors.email && errors.email}</p>
        </div>
        <div className={SignUpStyles.div}>
          <h3>Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={getValue}
            value={fdata.password}
          />
          <p>{errors.password && errors.password}</p>
        </div>
        <div className={SignUpStyles.div}>
          <h3>Confirm Password</h3>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmpwd"
            onChange={getValue}
            value={fdata.confirmpwd}
          />
          <p> {errors.confirmpwd && errors.confirmpwd}</p>
        </div>
        <div className={SignUpStyles.div}>
          <h3>Mobile</h3>
          <input
            type="tel"
            placeholder="mobile"
            name="mobile"
            onChange={getValue}
            value={fdata.mobile}
          />
          <p> {errors.mobile && errors.mobile}</p>
        </div>
        <div className={SignUpStyles.div1}>
          <h3>Gender :</h3>
          <div className={SignUpStyles.div}>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              onChange={getValue}
              id="male"
              value="male"
            />
          </div>
          <div className={SignUpStyles.div}>
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              onChange={getValue}
              id="female"
              value="female"
            />
          </div>

          <div className={SignUpStyles.div}>
            <label htmlFor="others">others</label>
            <input
              type="radio"
              name="gender"
              onChange={getValue}
              id="others"
              value="others"
            />
          </div>
        </div>
        <div className={SignUpStyles.div}>
          <h3>Skills :</h3>
          <div className={SignUpStyles.div1}>
            <label htmlFor="js">JavaScript</label>
            <input
              type="checkbox"
              name="skills"
              id="js"
              onChange={getValue}
              value="javascript"
            />
          </div>
          <div className={SignUpStyles.div1}>
            <label htmlFor="py">Python</label>
            <input
              type="checkbox"
              name="skills"
              id="py"
              onChange={getValue}
              value="Python"
            />
          </div>
          <div className={SignUpStyles.div1}>
            <label htmlFor="rjs">React Js</label>
            <input
              type="checkbox"
              name="skills"
              id="rjs"
              onChange={getValue}
              value="React Js"
            />
          </div>
          <div className={SignUpStyles.div1}>
            <label htmlFor="ejs">Express Js</label>
            <input
              type="checkbox"
              name="skills"
              id="ejs"
              onChange={getValue}
              value="Express Js"
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
