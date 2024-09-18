import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/navbar/Navbar';
import profile from "../../images/profile.webp"
import { emailRegex, mobileRegex, nameRegex } from "../../validation/Validation";
import { errorEmail, errorFirstname, errorLastname} from "../../validation/ErrorMessage";
import { getCustomerByUsername, updateCustomerService } from '../../services/customer/CustomerService';
import Footer from '../shared/footer/Footer';

function CustomerProfile() {
    const [id, setId] = useState()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("")
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [button, setButton] = useState(false);
    const navigate = new useNavigate()
    const [msg,setMsg]=useState()
    const [customerData,setCustomerdata] = useState([]);

    const getCustomerData = async () => {
        let response = await getCustomerByUsername(localStorage.getItem('username'));
        console.log(response)
        setId(response.data.id);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setMobileNumber(response.data.mobile);
        setDateOfBirth(response.data.dateOfBirth);
        setEmail(response.data.email);
        setCustomerdata(response.data);

    }

    const val={
        id,
        firstName,
        lastName,
        mobile:mobileNumber,
        email,
        dateOfBirth
    }

   const editCustomerProfiledata = async()=>{
        let response = await updateCustomerService(val);
        console.log("responce data",response);
        alert("customer updated successfully!")
    }

    useEffect(
        ()=>{
        getCustomerData();
    },[])

  return (
    <div>
    <Navbar></Navbar>
    <div className='bg-warning text-center display-3 py-3 text-dark fw-bold'>Customer Profile</div>
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
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
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
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
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
                    getCustomerData();
                  }}
                >
                  Close
                </button>
                <button
                  class="btn btn-primary px-3 fw-bold ms-3"
                  type="button"
                  onClick={() => {
                    editCustomerProfiledata();
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
    <Footer></Footer>
   </div>
  )
}

export default CustomerProfile