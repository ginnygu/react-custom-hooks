import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CheckToken from "../../hooks/CheckToken";

import "./Signin.css";

function Signin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { checkJwtToken } = CheckToken();

  useEffect(() => {
    if (checkJwtToken()) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let payload = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });

      window.localStorage.setItem("jwtToken", payload.data.payload);

      let decodedToken = jwtDecode(payload.data.payload);

      setUser({
        email: decodedToken.email,
        username: decodedToken.username,
      });

      navigate("/protected-home");
    } catch (e) {
      toast.error(e.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="form-div-signin">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signin;
