import { successAlet, warningAlert } from "../alerts/Alert";
import { allPlans } from "../../services/admin/AdminServices";
import { addScheme, updateScheme } from "../../services/scheme/SchemeService";
import { addImage } from "../../services/files/File";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateScheme = (details) => {
  details = details.data;
  console.log("details in 0000000000000>>>>", details);
  const [planId, setPlanId] = useState();
  const [schemeName, setSchemeName] = useState(details.schemeName);
  const [schemeImage, setSchemeImage] = useState(details.schemeImage);
  const [image, setImage] = useState(details.schemeImage);
  const [schemeDescription, setSchemeDescription] = useState(
    details.description
  );
  const [minAmount, setMinAmount] = useState(details.minAmount);
  const [maxAmount, setMaxAmount] = useState(details.maxAmount);
  const [minInvestMentTime, setMinInvestMentTime] = useState(
    details.minDuration
  );
  const [maxInvestMentTime, setMaxInvestMentTime] = useState(
    details.maxDuration
  );
  const [minAge, setMinAge] = useState(details.minAge);
  const [maxAge, setMaxAge] = useState(details.maxAge);
  const [profit, setProfit] = useState(details.profitRatio);
  const [regCommition, setRegCommition] = useState(
    details.registrationCommRatio
  );
  const [installmentCommission, setInstallMentCommission] = useState(
    details.installmentCommRatio
  );
  const [documents, setDocuments] = useState(details.requierdDocs);

  const [plans, setPlans] = useState([]);
  const navigate = new useNavigate();

  const getPlanData = async () => {
    let response = await allPlans(0, 30);

    setPlans("plandata---------", response.data.content);
  };

  const data = {
    planId,
    schemeName,
    schemeImage,
    description: schemeDescription,
    minAmount,
    maxAmount,
    minInvestmentTime: minInvestMentTime,
    maxInvestmentTime: maxInvestMentTime,
    minAge,
    maxAge,
    profitRatio: profit,
    registrationCommRatio: regCommition,
    installmentCommRatio: installmentCommission,
    documents,
  };

  

  const handleUpdate = async (e) => {
    try {
      console.log("documents are ===", d);
      e.preventDefault();
      let response = await updateScheme(d);
      console.log("response of add scheme---", response);
      if (response) {
        successAlet("scheme successfully uploaded");
        
      }
     
    } catch (error) {
      warningAlert("some error occured");
    }
  };

  let d = {
    schemeId: details.schemeId,
    schemeName,
    schemeImage,
    description: schemeDescription,
    minAmount,
    maxAmount,
    minInvestmentTime: minInvestMentTime,
    maxInvestmentTime: maxInvestMentTime,
    minAge,
    maxAge,
    profitRatio: profit,
    registrationCommRatio: regCommition,
    installmentCommRatio: installmentCommission,
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    try {
      let response = await addImage(data);
      console.log(response.data);
      setSchemeImage(response.data);
      if (response) {
        successAlet("image successfully uploaded");
      }
    } catch (error) {
      warningAlert("some error occued ");
    }
  };

  useEffect(() => {
    getPlanData();
  }, []);

  return (
    <div className=" offset-1 col-10 mt-5 bg1">
      <form>
        <div className="fs-2 fw-bold text-dark">Plan Details</div>
        <div className="row align-items-center">
          <div className="col-6">
            <div class="mb-3 d-flex">
              <input
                class="form-control py-3 rounded-pill"
                type="file"
                id="formFile"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <button
                type="button"
                className="btn  btn-success fw-bold rounded-pill fw-bold text-white"
                onClick={submitImage}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="col-6  text-center">
            <img
              src={
                "http://localhost:8080/insuranceapp/download?file=" +
                schemeImage
              }
              alt="scheme image "
              className="img-fluid shadow-lg"
              style={{
                height: "15rem",
                width: "30rem",
              }}
            ></img>
          </div>
        </div>
        <div className="row">
          <div class="col-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={schemeName}
                onChange={(e) => {
                  setSchemeName(e.target.value);
                }}
              />
              <label for="floatingInput">Scheme Name</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div class="form-floating mb-3">
              <textarea
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="textArea"
                style={{ height: "5rem" }}
                value={schemeDescription}
                onChange={(e) => {
                  setSchemeDescription(e.target.value);
                }}
              />
              <label for="textArea">Scheme Description</label>
            </div>
          </div>
        </div>
        <div className="fs-2 fw-bold text-dark">Scheme Details</div>
        <div className="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={minAmount}
                onChange={(e) => {
                  setMinAmount(e.target.value);
                }}
              />
              <label for="floatingInput">Min Amount</label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={maxAmount}
                onChange={(e) => {
                  setMaxAmount(e.target.value);
                }}
              />
              <label for="floatingInput">Max Amount</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={minInvestMentTime}
                onChange={(e) => {
                  setMinInvestMentTime(e.target.value);
                }}
              />
              <label for="floatingInput">Min InvestMent Time</label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={maxInvestMentTime}
                onChange={(e) => {
                  setMaxInvestMentTime(e.target.value);
                }}
              />
              <label for="floatingInput">Max InvestMent Time</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={minAge}
                onChange={(e) => {
                  setMinAge(e.target.value);
                }}
              />
              <label for="floatingInput">Min Age</label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={maxAge}
                onChange={(e) => {
                  setMaxAge(e.target.value);
                }}
              />
              <label for="floatingInput">Max Age</label>
            </div>
          </div>
        </div>
        <div className="fs-2 fw-bold text-dark">Agent Commission Details</div>
        <div className="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={profit}
                onChange={(e) => {
                  setProfit(e.target.value);
                }}
              />
              <label for="floatingInput">Profit Percentage</label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={regCommition}
                onChange={(e) => {
                  setRegCommition(e.target.value);
                }}
              />
              <label for="floatingInput">Registeration Commition </label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-pill fw-bold text-primary"
                id="floatingInput"
                value={installmentCommission}
                onChange={(e) => {
                  setInstallMentCommission(e.target.value);
                }}
              />
              <label for="floatingInput">Installment Commition</label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-success btn-lg rounded-pill fw-bold text-white"
          onClick={(e) => handleUpdate(e)}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateScheme;
