import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import { useNavigate } from "react-router-dom";
import {
  saveCustomer,
  getAllCustomer,
} from "../../services/customer/CustomerService";
import Table from "../../component/shared/table/Table";
import PageSizeSetter from "../shared/page/PageSizeSetter";
import PaginationApp from "../shared/page/PaginationApp";
import { act } from "react-dom/test-utils";
import { eightCharAlphanumericPasswordRegex, emailRegex, houseNoRegex, mobileRegex, nameRegex, pinRegex } from "../../validation/Validation";
import { errorCity, errorEmail, errorFirstname, errorHouseNo, errorLastname, errorMobile, errorPassword, errorPin, errorState } from "../../validation/ErrorMessage";
const AddCustomer = () => {
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [actionData, setActionData] = useState([]);
  const [button, setButton] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [totalpage, setTotalpage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = new useNavigate();
  const [action, setAction] = useState(true);
  const [show, setShow] = useState(false);
  const [msg,setMsg]=useState();

  const data = {
    firstName,
    lastName,
    username,
    password,
    dateOfBirth,
    mobileNumber,
    email,
    houseNo,
    apartment,
    city,
    pincode,
    state,
  };

  const addCustomerData = async () => {
    try {
      let response = await saveCustomer(data);
      setActionData(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const GetAll = async () => {
    let response = await getAllCustomer(pageNumber, pageSize);
    setActionData(response.data.content);
    setTotalpage(
      Math.ceil(parseInt(response.headers["customer-count"]) / pageSize)
    );
    setTotalElements(
      Math.ceil(parseInt(response.headers["customer-count"]) / pageSize)
    );
    console.log(response);
    setActionData(response.data.content);
  };

  const setFlow = async () => {
    setAction(false);
    setShow(true);
  };

  const hideFlow = async () => {
    setAction(true);
    setShow(false);
  };

  useEffect(() => {
    GetAll();
  }, [pageNumber, pageSize, totalpage, totalElements]);

  return (
    <>
      <Navbar></Navbar>

      <div className="bg-dark text-center display-3 py-3 text-white fw-bold">
        Add Your Customer
      </div>

      <div className="container">
        {show && (
          <div className="row">
            <div className="col-8 offset-2 shadow-lg">
              <form class="row g-3 p-5 ">
                <div className="col-12 fw-bold fs-2">Profile Details</div>
                <div className="text-danger text-center fw-bold">{msg}</div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    id="inputEmail4"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setButton(true);
                      if (!nameRegex.test(e.target.value)) {
                        setMsg(errorFirstname);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    id="inputEmail4"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setButton(true);
                      if (!nameRegex.test(e.target.value)) {
                        setMsg(errorLastname);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    id="inputEmail4"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setButton(true);
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    id="inputEmail4"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setButton(true);
                      if (!eightCharAlphanumericPasswordRegex.test(e.target.value)) {
                        setMsg(errorPassword);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control rounded-5"
                    id="inputEmail4"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setButton(true);
                      if (!emailRegex.test(e.target.value)) {
                        setMsg(errorEmail);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Mobile</label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setButton(true);
                      if (!mobileRegex.test(e.target.value)) {
                        setMsg(errorMobile);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                 
                </div>
                <div class="col-md-6">
                  <label class="form-label">DateOfBirth</label>
                  <input
                     type="date" id="DOB" name="DOB" min="1979-01" max="2020-01"
                    class="form-control rounded-5"
                    value={dateOfBirth}
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
                        console.log(formattedDate);
                      setDateOfBirth(formattedDate);
                      setButton(true);
                     
                    }}
                  />
                </div>

                <div className="col-12 fw-bold fs-2">Address</div>

                <div class="col-md-3">
                  <label class="form-label">House Number</label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    value={houseNo}
                    onChange={(e) => {
                      setHouseNo(e.target.value);
                      setButton(true);
                      if (!houseNoRegex.test(e.target.value)) {
                        setMsg(errorHouseNo);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>

                <div class="col-md-3">
                  <label for="inputCity" class="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    id="inputCity"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setButton(true);
                      if (!nameRegex.test(e.target.value)) {
                        setMsg(errorCity);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>
                <div class="col-md-3">
                  <label class="form-label">State</label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setButton(true);
                      if (!nameRegex.test(e.target.value)) {
                        setMsg(errorState);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>

                <div class="col-md-3">
                  <label class="form-label">PinCode</label>
                  <input
                    type="text"
                    class="form-control rounded-5"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setButton(true);
                      if (!pinRegex.test(e.target.value)) {
                        setMsg(errorPin);
                      } else {
                        setMsg("");
                      }
                    }}
                  />
                </div>
                {button ? (
                  <div class="col-2">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg"
                      onClick={addCustomerData}
                    >
                      Submit
                    </button>
                  </div>
                ) : null}

                {
                  <div class="col-2">
                    <button
                      type="submit"
                      class="btn btn-secondary btn-lg"
                      onClick={hideFlow}
                    >
                      Close
                    </button>
                  </div>
                }
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="background2 text-center display-3 py-3 text-white fw-bold">
        All Customers
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-4 offset-1">
            <PaginationApp
              totalpage={totalpage}
              setpage={setPageNumber}
              pageNumber={pageNumber}
            ></PaginationApp>
          </div>

          <div className="col-4">
            <input
              className="rounded-pill p-2 text-primary fw-bold"
              placeholder="search here"
            ></input>
          </div>
          <div className="col-2">
            <PageSizeSetter
              setPageSize={setPageSize}
              setTotalpage={setTotalpage}
              totalrecord={totalElements}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            ></PageSizeSetter>
          </div>
        </div>
      </div>

      <div className="container">
        {action && (
          <div
            className="btn btn-large btn-outline-primary fs-4 fw-bold"
            onClick={() => {
              setFlow();
            }}
          >
            Add new Customer
          </div>
        )}
        <div className="row">
          <div className=" col-12">
            <Table
              data={actionData}
              isDeleteButton={true}
              isUpdateButton={false}
              deleteFun={""}
            ></Table>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default AddCustomer;
