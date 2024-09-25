import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authservices/AuthServices";
import logImage from "../../images/logImage.png";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState("");
  const navigate = useNavigate(); // Correctly initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call login service
      const response = await loginService(username, password, roleType);

      // Debug: Log the response to verify the structure
      console.log('Login response:', response);

      // Check if response and data are defined
      if (response && response.data) {
        // Extract data from response
        const { accessToken, username, roleType, agentId } = response.data;

        // Store tokens and user information in localStorage
        localStorage.setItem('auth', "Bearer " + accessToken);
        localStorage.setItem('username', username);
        localStorage.setItem('Role', roleType);

        // Store agent ID if the role is an agent
        if (roleType === "ROLE_AGENT" && agentId) {
          localStorage.setItem('agentId', agentId);
        }

        // Navigate based on roleType
        switch (roleType) {
          case "ROLE_ADMIN":
            navigate('/admin');
            break;
          case "ROLE_CUSTOMER":
            navigate('/customer');
            break;
          case "ROLE_AGENT":
            navigate('/agent');
            break;
          case "ROLE_EMPLOYEE":
            navigate('/employee');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row m-5">
          <div className="col-6 mt-5">
            <img className="" src={logImage} alt="login" height={280} />
          </div>
          <div className="col-6">
            <div className="border-1 p-4 rounded shadow-sm">
              <div className="text-dark fs-1 text-center fw-bold mb-3">
                Login
              </div>
              <form>
                <select
                  className="form-select py-3 mb-3 rounded-pill"
                  aria-label="Default select example"
                  onChange={(e) => setRoleType(e.target.value)}
                  value={roleType}
                >
                  <option value="">Login As</option>
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_CUSTOMER">Customer</option>
                  <option value="ROLE_EMPLOYEE">Employee</option>
                  <option value="ROLE_AGENT">Agent</option>
                </select>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="floatingInput"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div>
                  <button
                    className="btn btn-lg px-3 fw-bold btn-primary my-3"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mt-3">
                  <a href="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
