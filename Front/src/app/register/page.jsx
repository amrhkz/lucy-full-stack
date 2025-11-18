"use client";
import React, { useState } from "react";
import "./register.css";
import Container from "@/component/container/container";
import Profile from "@/component/profile/profile";

const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // async function registerUser(ev) {
  //   ev.preventDefault();
  //   try {
  //     await axios.post("http://127.0.0.1:4000/register", {
  //       name,
  //       email,
  //       password,
  //     });
  //     alert("Registeration Successful. Now You Can Login");
  //   } catch (e) {
  //     alert("Registration failed. Please try again later");
  //   }
  // }
  return (
    <Container>
      {/* <div className="register-container">
        <form
          className="register-form"
          // onSubmit={registerUser}
        >
          <h1>Register Form</h1>
          <input
            type="text"
            // value={name}
            // onChange={(ev) => setName(ev.target.value)}
            placeholder="John Doe"
          />
          <input
            type="email"
            // value={email}
            // onChange={(ev) => setEmail(ev.target.value)}
            placeholder="your@email.com"
          />
          <input
            type="password"
            // value={password}
            // onChange={(ev) => setPassword(ev.target.value)}
            placeholder="password"
          />
          <button>Register</button>
        </form>
      </div> */}

      <Profile />
    </Container>
  );
};

export default Register;
