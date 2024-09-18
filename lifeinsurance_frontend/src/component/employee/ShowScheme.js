import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import {
  allPlans,
  getSchemeByPlanId,
  getSchemedetail,
} from "../../services/admin/AdminServices";
import Insurance from "../../images/Insurance.png";
import Table from "../../component/shared/table/Table";
import AddScheme from "../../component/scheme/AddScheme";
import { getSchemeByPlan } from "../../services/scheme/SchemeService";
import updateScheme from "../scheme/UpdateScheme";
import UpdateScheme from "../scheme/UpdateScheme";

const ShowScheme = () => {
  const [plans, setPlans] = useState([]);
  const [value, setValue] = useState(0);
  const [scheme, setScheme] = useState([]);
  const [detail, setDetail] = useState([]);
  const [id, setId] = useState(0);
  const [docs, setDocs] = useState([]);
  const [schemeShow, setSchemeShow] = useState(false);
  const [update, setUpdate] = useState();
  const [action, setAction] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const getAllPlan = async () => {
    let response = await allPlans(0, 30);
    setPlans(response.data.content);
  };

  const getSchemeData = async () => {
    let response = await getSchemeByPlanId(value);
    setScheme(response.data);
    console.log("get plan data is----------->1", response);
    setShow(true);
    setAction(false);
    setId(0)
  };

  const showDetail = async (scheme) => {
    setId(scheme.id);
    let response = await getSchemedetail(scheme.id);
    let data = {
      MinAge: response.data.minAge,
      MaxAge: response.data.maxAge,
      MinAmount: response.data.minAmount,
      MaxAmount: response.data.maxAmount,
      MinDuration: response.data.minDuration,
      MaxDuration: response.data.maxDuration,
    };

    console.log(
      "details are 6666666666666666666666666666666666666666",
      response.data
    );
    setImage(response.data.schemeImage);
    setDocs(response.data.requierdDocs);

    let a = [data];
    setDetail(a);
  };

  const handleUpdate = async (detail) => {
    console.log("detail value is ", detail);
    let res = await getSchemeByPlan(value);
    let d;
    res.data.forEach((element) => {
      if (element.schemeId == detail.id) d = element;
    });

    setAction(true);
    setShow(false);
    setUpdate(d);
    setId(0);
  };

  useEffect(() => {
    getAllPlan();
  }, []);

  useEffect(() => {
    if (value != 0) {
      getSchemeData();
    }
  }, [value]);

  const handleDelete = () => {};

  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <div className="row my-5">
          <div className="col-4 offset-4">
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                console.log(e.target.value);
                setValue(e.target.value);
                setSchemeShow(false);
              }}
            >
              <option selected value="plan">
                Select A Plan
              </option>
              {plans.map((plan) => {
                return <option value={plan.planId}>{plan.planName}</option>;
              })}
            </select>
          </div>
          {/* {!schemeShow ? (
            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-lg btn-primary fw-bold"
                  onClick={() => {
                    setSchemeShow(true);
                    setAction(false);
                  }}
                >
                  Add Scheme
                </button>
              </div>
            </div>
          ) : null}

          {schemeShow ? <AddScheme></AddScheme> : null} */}
        </div>
        {show && (
          <div>
            <div className="col-12">
              <div className="text-center bg-dark text-white">
                <label for="exampleInputPassword1" class="form-label ">
                  <h1>Schemes</h1>
                </label>
              </div>
            </div>

            {value != 0 ? (
              <Table
                data={scheme}
                //isUpdateButton={true}
                //isDeleteButton={true}
                showMoreButton={true}
               // UpdateFun={handleUpdate}
                //deleteFun={handleDelete}
                detailFun={showDetail}
              ></Table>
            ) : (
              <div className="text-danger text-center fw-bold">
                No Plan Selected{" "}
              </div>
            )}

{id != 0 ? (
          <div className="row mt-5">
            <div className="col-6">
              <table class="table table-info">
                <thead>
                  <tr>
                    <th scope="col">Required Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((x) => {
                    console.log("x value is ", docs);
                    return (
                      <tr>
                        <td>{x}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-6  text-center">
              <img
                src={
                  "http://localhost:8081/insuranceapp/download?file=" + image
                }
                alt="scheme image "
                className="img-fluid shadow-lg"
                style={{
                  height: "15rem",
                  width: "50rem",
                }}
              ></img>
            </div>
          </div>
        ) : null}

            {id != 0 ? (
              <Table
                data={detail}
                isUpdateButton={false}
                isDeleteButton={false}
                showMoreButton={false}
              ></Table>
            ) : null}
          </div>
        )}

        {action && <UpdateScheme data={update}></UpdateScheme>}

        
      </div>

      <Footer></Footer>
    </>
  );
};

export default ShowScheme;
