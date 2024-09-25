import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import {
  allPlans,
  getSchemeByPlanId,
  getSchemedetail,
} from "../../services/admin/AdminServices";
import Table from "../../component/shared/table/Table";
import AddScheme from "../../component/scheme/AddScheme";
import UpdateScheme from "../scheme/UpdateScheme";

const Schemes = () => {
  const [plans, setPlans] = useState([]);
  const [value, setValue] = useState(0);
  const [scheme, setScheme] = useState([]);
  const [detail, setDetail] = useState([]);
  const [id, setId] = useState(0);
  const [docs, setDocs] = useState([]);
  const [schemeShow, setSchemeShow] = useState(false);
  const [update, setUpdate] = useState(null);
  const [action, setAction] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAllPlan = async () => {
    setLoading(true);
    try {
      let response = await allPlans(0, 30);
      setPlans(response.data.content);
    } catch (err) {
      setError('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const getSchemeData = async () => {
    if (!value) return;
    setLoading(true);
    try {
      let response = await getSchemeByPlanId(value);
      setScheme(response.data);
      setShow(true);
      setAction(false);
      setId(0);
    } catch (err) {
      setError('Failed to fetch schemes for the selected plan');
    } finally {
      setLoading(false);
    }
  };

  const showDetail = async (scheme) => {
    setId(scheme.id);
    setLoading(true);
    try {
      let response = await getSchemedetail(scheme.id);
      setImage(response.data.schemeImage);
      setDocs(response.data.requierdDocs);
      setDetail([{
        MinAge: response.data.minAge,
        MaxAge: response.data.maxAge,
        MinAmount: response.data.minAmount,
        MaxAmount: response.data.maxAmount,
        MinDuration: response.data.minDuration,
        MaxDuration: response.data.maxDuration,
      }]);
    } catch (err) {
      setError('Failed to fetch scheme details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (detail) => {
    const selectedScheme = scheme.find(s => s.schemeId === detail.id);
    setUpdate(selectedScheme);
    setAction(true);
    setShow(false);
    setId(0);
  };

  useEffect(() => {
    getAllPlan();
  }, []);

  useEffect(() => {
    getSchemeData();
  }, [value]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row my-5">
          <div className="col-4 offset-4">
            <select
              className="form-select"
              aria-label="Select a Plan"
              onChange={(e) => {
                setValue(e.target.value);
                setSchemeShow(false);
              }}
            >
              <option selected value="plan">Select A Plan</option>
              {plans.map((plan) => (
                <option key={plan.planId} value={plan.planId}>{plan.planName}</option>
              ))}
            </select>
          </div>
          {!schemeShow && (
            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-lg btn-primary fw-bold"
                  onClick={() => setSchemeShow(true)}
                >
                  Add Scheme
                </button>
              </div>
            </div>
          )}
          {schemeShow && <AddScheme />}
        </div>

        {loading && <div className="text-center my-4">Loading...</div>}  {/* Simple loading message */}

        {error && <div className="text-danger text-center">{error}</div>}  {/* Show error */}

        {show && (
          <div>
            <div className="col-12 text-center bg-dark text-white">
              <h1>Schemes</h1>
            </div>
            {value !== 0 ? (
              <Table
                data={scheme}
                isUpdateButton={true}
                isDeleteButton={true}
                showMoreButton={true}
                UpdateFun={handleUpdate}
                detailFun={showDetail}
              />
            ) : (
              <div className="text-danger text-center fw-bold">No Plan Selected</div>
            )}
            {id !== 0 && (
              <div className="row mt-5">
                <div className="col-6">
                  <table className="table table-info">
                    <thead>
                      <tr>
                        <th scope="col">Required Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((doc, index) => (
                        <tr key={index}>
                          <td>{doc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-6 text-center">
                  <img
                    src={`http://localhost:8081/insuranceapp/download?file=${image}`}
                    alt="scheme"
                    className="img-fluid shadow-lg"
                    style={{ height: "15rem", width: "50rem" }}
                  />
                </div>
              </div>
            )}
            {id !== 0 && (
              <Table
                data={detail}
                isUpdateButton={false}
                isDeleteButton={false}
                showMoreButton={false}
              />
            )}
          </div>
        )}
        {action && <UpdateScheme data={update} />}
      </div>
      <Footer />
    </>
  );
};

export default Schemes;
