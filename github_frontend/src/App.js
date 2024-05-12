import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Alert from "./Components/Alert";

import AlertState from "./Context/alerts/AlertStates";
import AuthState from "./Context/auth/AuthState";
import GithubState from "./Context/github/GithubState";
import Errorpage from "./Components/Errorpage";

import "./css/app.css";
import HomePage from "./Components/HomePage";

function App() {

  return (
    <>
      <GithubState>
          <AlertState>
            <AuthState>
              <BrowserRouter>
                <Navbar />
                <Alert />
                <Routes>

                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Errorpage />} />

                </Routes>
              </BrowserRouter>
            </AuthState>
          </AlertState>
      </GithubState>
    </>
  );
}

export default App;
