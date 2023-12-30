import React, { useState } from "react";
import Login from "./Login";
import OtpVerify from "./OtpVerify";

export default function Authentication() {
  let [isVerify, setisVerify] = useState(false);
  let [fdata, setfdata] = useState({ firstfield: "", password: "" });
  return (
    <>
      {isVerify || (
        <Login fdata={fdata} setfdata={setfdata} setisVerify={setisVerify} />
      )}

      {isVerify && <OtpVerify otpLength={6} fdata={fdata} />}
    </>
  );
}
