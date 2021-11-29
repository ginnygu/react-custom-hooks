import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Nav from "./components/nav/Nav";
import ProtectedHome from "./components/protectedHome/ProtectedHome";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import MovieDetail from "./components/movieDetail/MovieDetail";
import Profile from "./components/profile/Profile";
import Favorites from "./components/favorites/Favorites";

import { AuthContext } from "./context/AuthContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken");

    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" });
      } else {
        let decodedToken = jwtDecode(jwtToken);

        dispatch({
          type: "LOGIN",
          email: decodedToken.email,
          username: decodedToken.username,
        });
      }
    }
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <Router>
        <Nav />
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route
            path="/protected-home"
            element={
              <PrivateRoute>
                <ProtectedHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/protected-movie-detail/:moveiId"
            element={
              <PrivateRoute>
                <MovieDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/protected/favorite-movies"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
