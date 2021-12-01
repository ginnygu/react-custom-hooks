import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import FirstNameHooks from "../../hooks/FirstNameHooks";
import LastNameHooks from "../../hooks/LastNameHooks";
import UsernameHooks from "../../hooks/UsernameHooks";
import PasswordHooks from "../../hooks/PasswordHooks";
import EmailHooks from "../../hooks/EmailHooks";
import CheckToken from "../../hooks/CheckToken";
import "./Signup.css";

function Signup() {
  const [firstName, handleFirstNameOnChange, firstNameError] = FirstNameHooks();
  const [
    lastName,
    handleLastNameOnChange,
    lastNameError,
    setOnFocus,
    setOnBlur,
  ] = LastNameHooks();

  const [
    username,
    handleUsernameOnChange,
    usernameError,
    setUsernameOnFocus,
    setUsernameOnBlur,
  ] = UsernameHooks();

  const [
    password,
    handlePasswordOnChange,
    passwordError,
    setPasswordOnFocus,
    setPasswordOnBlur,
  ] = PasswordHooks();

  const [
    email,
    handleEmailOnChange,
    emailError,
    setEmailOnFocus,
    setEmailOnBlur,
  ] = EmailHooks();

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
      let url =
        process.env.NODE_ENV === "production"
          ? "https://team-2-movie-backend.herokuapp.com/api/users/create-user"
          : "http://localhost:3001/api/users/create-user";

      await axios.post(url, {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      toast.success("Congrats~! now you please sign in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="first name"
              onChange={handleFirstNameOnChange}
            />
            <label htmlFor="firstName">first name</label>

            {firstNameError && (
              <div className="alert alert-danger" role="alert">
                {firstNameError}{" "}
              </div>
            )}
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="last name"
              onChange={handleLastNameOnChange}
              onBlur={setOnBlur}
              onFocus={setOnFocus}
            />
            <label htmlFor="lastName">last name</label>
            {lastNameError && (
              <div className="alert alert-danger" role="alert">
                {lastNameError}{" "}
              </div>
            )}
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="username"
              onChange={handleUsernameOnChange}
              onBlur={setUsernameOnBlur}
              onFocus={setUsernameOnFocus}
            />
            <label htmlFor="username">username</label>
            {usernameError && (
              <div className="alert alert-danger" role="alert">
                {usernameError}{" "}
              </div>
            )}
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={handleEmailOnChange}
              onBlur={setEmailOnBlur}
              onFocus={setEmailOnFocus}
            />
            <label htmlFor="email">Email address</label>
            {emailError && (
              <div className="alert alert-danger" role="alert">
                {emailError}{" "}
              </div>
            )}
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handlePasswordOnChange}
              onBlur={setPasswordOnBlur}
              onFocus={setPasswordOnFocus}
            />
            <label htmlFor="password">Password</label>
            {passwordError && (
              <div className="alert alert-danger" role="alert">
                {passwordError}{" "}
              </div>
            )}
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;

/*
Write 3 more custom hooks

username
password
email

*/

/*
    <div>
      <form onSubmit={handleSubmit}>
        <input name="firstName" onChange={handleFirstNameOnChange} />
        <div>{firstNameError && firstNameError}</div>
        <input
          name="lastName"
          onChange={handleLastNameOnChange}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnBlur(true)}
        />
        <div>{lastNameError && lastNameError}</div>
        <input
          name="username"
          onChange={handleUsernameOnChange}
          onFocus={() => setUsernameOnFocus(true)}
          onBlur={() => setUsernameOnBlur(true)}
        />
        <div>{usernameError && usernameError}</div>

        <input
          name="password"
          onChange={handlePasswordOnChange}
          onFocus={() => setPasswordOnFocus(true)}
          onBlur={() => setPasswordOnBlur(true)}
        />
        <div>{passwordError && passwordError}</div>
        <input
          name="email"
          onChange={handleEmailOnChange}
          onFocus={() => setEmailOnFocus(true)}
          onBlur={() => setEmailOnBlur(true)}
        />
        <div>{emailError && emailError}</div>
        <button>Submit</button>
      </form>
    </div>


*/

/*

    <div className="form-div-signin">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="first name"
            />
            <label htmlFor="floatingInput">first name</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
          </button>
        </form>
      </main>
    </div>

    */
