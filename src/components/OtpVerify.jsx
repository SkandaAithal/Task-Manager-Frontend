import React, { useEffect, useRef, useState } from "react";
import LoginStyles from "../css/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OtpVerify({ otpLength, fdata }) {
  let { firstfield: email, password } = fdata;
  let navigateToMyTasks = useNavigate();
  let [otpInput, setOtpInput] = useState(Array(otpLength).fill(""));
  let inputRef = useRef([]);
  let [iserror, setIserror] = useState(false);
  let [otpTime, setOtpTime] = useState(60);

  // ! to get the value from input field
  const handleInputChange = (index, value) => {
    let newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setOtpTime((prev) => prev - 1);
    }, 1000);
    if (otpTime <= 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [otpTime]);

  // ! to handle backspace and if value already exists then to change that value
  const handleKeyUp = (index, e) => {
    e.preventDefault();
    let newOtp = [...otpInput];

    if (e.key === "Backspace" && index > 0) {
      newOtp[index] = "";
      inputRef.current[index - 1].focus();
    } else if (e.key === "Backspace" && index === 0) {
      newOtp[index] = "";
      inputRef.current[index].focus();
    }

    if (e.key.replace(/[^0-9]/g, "") && index < otpInput.length - 1) {
      newOtp[index] = e.key.replace(/[^0-9]/g, "");
      inputRef.current[index + 1].focus();
    } else if (e.key.replace(/[^0-9]/g, "") && index < otpInput.length) {
      newOtp[index] = e.key.replace(/[^0-9]/g, "");
      inputRef.current[index].focus();
    }

    setOtpInput(newOtp);
  };

  // ! to paste the otp
  const handlePaste = (e) => {
    let pastedData = e.clipboardData.getData("text");
    pastedData = pastedData.slice(0, 6).replace(/[^0-9]/g, "");
    let otpArray = pastedData.split("");

    otpArray.forEach((digit, index) => {
      setOtpInput((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = digit;
        return updatedOtp;
      });
    });
  };

  const otpSubmit = async (e) => {
    try {
      e.preventDefault();
      let otp = otpInput.join("");
      let { data } = await axios.post("http://localhost:3900/users/verifyotp", {
        otp,
        email,
      });
      let token = `Bearer ${data.token}`;
      localStorage.setItem("my-token", token);
      console.log(data);
      setIserror(data);
      if (!data.error) {
        setTimeout(() => {
          navigateToMyTasks("/tasks/home");
        }, 2000);
      }
    } catch (err) {
      console.log(err.response.data);
      setIserror(err.response.data);
    }
  };

  const sendNewOtpFunction = async (e) => {
    try {
      e.preventDefault();
      let { data } = await axios.post("http://localhost:3900/users/login", {
        firstfield: email,
        password: password,
      });
      setIserror(data);
      console.log(data);
      setOtpTime(60);
    } catch (err) {
      setIserror(err.response.data);
    }
  };
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);
  return (
    <div className={LoginStyles.wrapper}>
      <form className={LoginStyles.form} onSubmit={otpSubmit}>
        <h1>OTP Verification</h1>
        {iserror.token ? (
          <h3>{iserror.message}</h3>
        ) : iserror.error ? (
          <h3>
            {iserror.message}
            <button onClick={sendNewOtpFunction}>Send new OTP</button>
          </h3>
        ) : otpTime ? (
          <h3>OTP expires in {otpTime}s</h3>
        ) : (
          <h3>
            OTP expired
            <button onClick={sendNewOtpFunction}>Send new OTP</button>
          </h3>
        )}

        <div className={LoginStyles.form1}>
          {otpInput.map((ele, index) => {
            return (
              <input
                className={LoginStyles.otp}
                type="text"
                onChange={(e) => {
                  handleInputChange(
                    index,
                    e.target.value.replace(/[^0-9]/g, "")
                  );
                }}
                onKeyUp={(e) => {
                  handleKeyUp(index, e);
                }}
                onPaste={(e) => {
                  handlePaste(e);
                }}
                value={otpInput[index]}
                ref={(ref) => (inputRef.current[index] = ref)}
                key={index}
                maxLength={1}
              />
            );
          })}
        </div>

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}
