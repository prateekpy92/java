import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/Navbar";
import {
  EmployeeByUsername,
  EditEmployeeService
} from "../../services/employee/Employee";
import { emailRegex, mobileRegex, nameRegex } from "../../validation/Validation";
import { errorEmail, errorFirstname, errorLastname, errorMobile} from "../../validation/ErrorMessage";
import { useNavigate } from "react-router-dom";
import profile from "../../images/profile.webp"


function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob]=useState("");
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState('');
  const [msg,setMsg]=useState("")
  const [validateUser,setIsValidUser] = useState()
  const navigate = new useNavigate();

  const getEmployeeDetails = async () => {
    try{

     
    let response = await EmployeeByUsername(
      localStorage.getItem("username")
    );
    console.log("customer", response);
    setData(response.data);
   
    setFirstName(response.data.userDetails.firstName);
    setLastName(response.data.userDetails.lastName);
    setMobile(response.data.userDetails.mobileNumber);
    setEmail(response.data.userDetails.email);
    setDob(response.data.userDetails.dateOfBirth);
    

  } catch (error) {
    alert(error.response.data.message)
  }
  };

  useEffect(()=>
  {
    console.log("employee details----------------------------666666666666666666666")
    getEmployeeDetails();
  },[])

  const saveEmployeeDetail = async () => {
    try {
      let response = await EditEmployeeService(
        data.employeeId,
        firstName,
        lastName,
        mobile,
        email,
        dob

      );

      if (response.status == 200) {
        alert("profile updated successfully!");
      }
      setEmployee(response);
    } catch (error) {
      alert("Something went wrong");
      setEmployee(error)
    }
  };

 

  return (
    <div>
      <Navbar></Navbar>

      <div class="container rounded">
        <div class="row offset-1 justify-content-between">
          <div class="col-md-3 border-right bg-white">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="220px"
                src={profile}
              />
              <span class="font-weight-bold"></span>
              {firstName + " " + lastName}
              <span class="text-black-50">{email}</span>
              <span> </span>
            </div>
          </div>

          <div class="col-8 border-right bg-white">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Details</h4>
               
              </div>
              <div className="text-danger text-center">{msg}</div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">FirstName</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if(!nameRegex.test(e.target.value)){
                        setMsg(errorFirstname)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">LastName</label>
                  <input
                    type="text"
                    class="form-control"
                    value={lastName}
                    placeholder="LastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if(!nameRegex.test(e.target.value)){
                        setMsg(errorLastname)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-6">
                  <label class="labels">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(!emailRegex.test(e.target.value)){
                        setMsg(errorEmail)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Mobile</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if(!mobileRegex.test(e.target.value)){
                        setMsg(errorEmail)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
            </div>
            </div>
            <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">DOB</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="YYYY-MM-DD"
                    value={dob}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(!emailRegex.test(e.target.value)){
                        setMsg(errorEmail)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
            </div>
            </div>
              <div className="row mt-3">
                <div class=" col-6 d-flex">
                  <button
                    className="btn btn-warning fw-bold"
                    type="button"
                    onClick={() => {
                      getEmployeeDetails();
                    }}
                  >
                    Close
                  </button>
                  <button
                    class="btn btn-primary px-3 fw-bold ms-3"
                    type="button"
                    onClick={() => {
                      saveEmployeeDetail();
                    }}
                  >
                    Save
                  </button>
                </div>
               </div>
            </div>
          </div>
          <div style={{ marginTop: "30vh" }}></div>
        </div>
      </div>
     </div>
  );
}

export default EditProfile;
