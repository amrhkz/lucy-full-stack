import React from "react";
import "./login.css";
import { handleGithubLogin } from "@/lib/action";

export const metadata = {
  title: "Login",
  description: "Malek Mind Map Login Description",
};

const Login = async () => {
  return (
    <div className="register-page">
      <form className="register-form" action={handleGithubLogin}>
        <h1>Login Form</h1>
        <button>Github</button>
        <hr />
        <input type="email" placeholder="your@email.com" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
