import { successAlet, warningAlert } from "../alerts/Alert";
import { allPlans } from "../../services/admin/AdminServices";
import { addScheme, updateScheme } from "../../services/scheme/SchemeService";
import { addImage } from "../../services/files/File";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateScheme = (props) => {
    // Fallback to an empty object if details are undefined
    const details = props.data || {};
    console.log("details in 0000000000000>>>>", details);

    const [schemeName, setSchemeName] = useState(details.schemeName || '');
    const [schemeImage, setSchemeImage] = useState(details.schemeImage || '');
    const [image, setImage] = useState(null); // Change to null initially
    const [schemeDescription, setSchemeDescription] = useState(details.description || '');
    const [minAmount, setMinAmount] = useState(details.minAmount || 0);
    const [maxAmount, setMaxAmount] = useState(details.maxAmount || 0);
    const [minInvestMentTime, setMinInvestMentTime] = useState(details.minDuration || 0);
    const [maxInvestMentTime, setMaxInvestMentTime] = useState(details.maxDuration || 0);
    const [minAge, setMinAge] = useState(details.minAge || 0);
    const [maxAge, setMaxAge] = useState(details.maxAge || 0);
    const [profit, setProfit] = useState(details.profitRatio || 0);
    const [regCommition, setRegCommition] = useState(details.registrationCommRatio || 0);
    const [installmentCommission, setInstallMentCommission] = useState(details.installmentCommRatio || 0);

    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    const getPlanData = async () => {
        try {
            let response = await allPlans(0, 30);
            setPlans(response.data.content);
        } catch (error) {
            console.error("Error fetching plans:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
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

        try {
            console.log("Submitting data:", d);
            let response = await updateScheme(d);
            console.log("Response of update scheme:", response);
            if (response) {
                successAlet("Scheme successfully updated");
                navigate("/your-success-page"); // Redirect if needed
            }
        } catch (error) {
            warningAlert("Some error occurred");
        }
    };

    const submitImage = async (e) => {
        e.preventDefault();
        if (!image) {
            warningAlert("Please select an image first.");
            return;
        }

        const data = new FormData();
        data.append("file", image);

        try {
            let response = await addImage(data);
            console.log("Image upload response:", response.data);
            setSchemeImage(response.data);
            if (response) {
                successAlet("Image successfully uploaded");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            warningAlert("Some error occurred while uploading image");
        }
    };

    useEffect(() => {
        getPlanData();
    }, []);

    return (
        <div className="offset-1 col-10 mt-5 bg1">
            <form>
                <div className="fs-2 fw-bold text-dark">Plan Details</div>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="mb-3 d-flex">
                            <input
                                className="form-control py-3 rounded-pill"
                                type="file"
                                id="formFile"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-success fw-bold rounded-pill text-white"
                                onClick={submitImage}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                    <div className="col-6 text-center">
                        <img
                            src={"http://localhost:8081/insuranceapp/download?file=" + schemeImage}
                            alt="Scheme"
                            className="img-fluid shadow-lg"
                            style={{ height: "15rem", width: "30rem" }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="floatingInput"
                                value={schemeName}
                                onChange={(e) => setSchemeName(e.target.value)}
                            />
                            <label htmlFor="floatingInput">Scheme Name</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control rounded-pill fw-bold text-primary"
                                id="textArea"
                                style={{ height: "5rem" }}
                                value={schemeDescription}
                                onChange={(e) => setSchemeDescription(e.target.value)}
                            />
                            <label htmlFor="textArea">Scheme Description</label>
                        </div>
                    </div>
                </div>
                <div className="fs-2 fw-bold text-dark">Scheme Details</div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="minAmount"
                                value={minAmount}
                                onChange={(e) => setMinAmount(e.target.value)}
                            />
                            <label htmlFor="minAmount">Min Amount</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="maxAmount"
                                value={maxAmount}
                                onChange={(e) => setMaxAmount(e.target.value)}
                            />
                            <label htmlFor="maxAmount">Max Amount</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="minInvestmentTime"
                                value={minInvestMentTime}
                                onChange={(e) => setMinInvestMentTime(e.target.value)}
                            />
                            <label htmlFor="minInvestmentTime">Min Investment Time</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="maxInvestmentTime"
                                value={maxInvestMentTime}
                                onChange={(e) => setMaxInvestMentTime(e.target.value)}
                            />
                            <label htmlFor="maxInvestmentTime">Max Investment Time</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="minAge"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                            />
                            <label htmlFor="minAge">Min Age</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="maxAge"
                                value={maxAge}
                                onChange={(e) => setMaxAge(e.target.value)}
                            />
                            <label htmlFor="maxAge">Max Age</label>
                        </div>
                    </div>
                </div>
                <div className="fs-2 fw-bold text-dark">Agent Commission Details</div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="profit"
                                value={profit}
                                onChange={(e) => setProfit(e.target.value)}
                            />
                            <label htmlFor="profit">Profit Percentage</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="registrationCommission"
                                value={regCommition}
                                onChange={(e) => setRegCommition(e.target.value)}
                            />
                            <label htmlFor="registrationCommission">Registration Commission</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill fw-bold text-primary"
                                id="installmentCommission"
                                value={installmentCommission}
                                onChange={(e) => setInstallMentCommission(e.target.value)}
                            />
                            <label htmlFor="installmentCommission">Installment Commission</label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-success btn-lg rounded-pill fw-bold text-white"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateScheme;
