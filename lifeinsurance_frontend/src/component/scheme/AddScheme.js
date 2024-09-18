import React, { useEffect, useState } from 'react'
import { successAlet, warningAlert } from '../alerts/Alert';
import { allPlans } from '../../services/admin/AdminServices';
import { addScheme } from '../../services/scheme/SchemeService';
import { addImage } from '../../services/files/File';
import { minAmountRegex, salaryRegex } from '../../validation/Validation';
import { errorMaxAge, errorMaxAmount, errorMaxTime, errorMinAge, errorMinAmount, errorMinTime } from '../../validation/ErrorMessage';

const AddScheme = () => {

    const [planId, setPlanId] = useState();
    const [schemeName, setSchemeName] = useState();
    const [schemeImage,setSchemeImage]=useState();
    const [image, setImage] = useState();
    const [schemeDescription, setSchemeDescription] = useState();
    const [minAmount, setMinAmount] = useState();
    const [maxAmount, setMaxAmount] = useState();
    const [minInvestMentTime, setMinInvestMentTime] = useState();
    const [maxInvestMentTime, setMaxInvestMentTime] = useState();
    const [minAge, setMinAge] = useState();
    const [maxAge, setMaxAge] = useState();
    const [profit, setProfit] = useState();
    const [regCommition, setRegCommition] = useState();
    const [installmentCommission, setInstallMentCommission] = useState();
    const [documents,setDocuments]=useState([]);
    const [plans, setPlans] = useState([]);
    const [msg,setMsg]=useState('')

    const getPlanData = async () => {

        let response = await allPlans(0, 30);
        setPlans(response.data.content);

    }
    
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
        documents
    }

    const handleCheckboxChange = (e, documentType) => {
        const isChecked = e.target.checked;
    
        // Update the documents array based on the checkbox change
        if (isChecked) {
            setDocuments((prevDocuments) => [...prevDocuments, documentType]);
        } else {
            setDocuments((prevDocuments) =>
                prevDocuments.filter((doc) => doc !== documentType)
            );
        }
    };
    

    const handleSubmit = async (e) => {
        try {
            console.log("documents are ===",data.documents)
            e.preventDefault();
            let response = await addScheme(data);
            console.log("response of add scheme---",response);
            if(response){
                successAlet("scheme successfully uploaded")
            }
        }
        catch (error) {
            warningAlert("some error occured")
        }

    }


    const submitImage = async(e) => {
        e.preventDefault();
        if (!image) return; 
        const data = new FormData();
        data.append("file", image);
        try {
            let response= await addImage(data);
            console.log(response.data);
            setSchemeImage(response.data);
            if(response){
                successAlet("image successfully uploaded")
            }
        }
        catch (error) {
            warningAlert("some error occued ")
        }
    }
     
    useEffect(() => {
        // Check if minAmount is greater than or equal to maxAmount
        if (minAmount && maxAmount && parseInt(minAmount) >= parseInt(maxAmount)) {
            setMsg(errorMaxAmount);
        } else {
            setMsg('');
        }
    }, [minAmount,maxAmount]);

    useEffect(() => {
        // Check if minAmount is greater than or equal to maxAmount
        if (minInvestMentTime && maxInvestMentTime && parseInt(minInvestMentTime) >= parseInt(maxInvestMentTime)) {
            setMsg(errorMaxTime);
        } else {
            setMsg('');
        }
    }, [minInvestMentTime,maxInvestMentTime]);

    useEffect(() => {
        // Check if minAmount is greater than or equal to maxAmount
        if (minAge && maxAge && parseInt(minAge) >= parseInt(maxAge)) {
            setMsg(errorMaxAge);
        } else {
            setMsg('');
        }
    }, [minAge,maxAge]);

    useEffect(
        () => {
            getPlanData();
        }
        , []
    )

    return (
        <div className=' offset-2 col-8 mt-5'>
            <form>
                <div className='fs-2 fw-bold text-dark'>Plan Details</div>
                <div className='row align-items-center'>
                    <div class="col-3">
                        <select class="form-select py-3" aria-label="Default select example"
                            onChange={
                                (e) => {
                                    setPlanId(e.target.value);
                                }
                            }
                        >
                            <option selected>select plan</option>
                            {
                                plans.map(
                                    (plan) => {
                                        return <option value={plan.planId}>{plan.planName}</option>
                                    }
                                )
                            }

                        </select>
                    </div>
                    <div className='col-3'>
                        <div class="mb-3 d-flex">
                            <input class="form-control py-3" type="file" id="formFile"

                                onChange={
                                    (e) => {
                                        setImage(e.target.files[0]);
                                    }
                                }

                            />
                             <button type='button' className='btn  btn-outline-primary fw-bold' onClick={submitImage}>Upload</button>
                            
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"
                                value={schemeName}
                                onChange={
                                    (e) => {
                                        setSchemeName(e.target.value);
                                    }
                                }

                            />
                            <label for="floatingInput">Scheme Name</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div class="form-floating mb-3">
                            <textarea type="text" class="form-control" id="textArea" style={{ height: "5rem" }}

                                value={schemeDescription}
                                onChange={
                                    (e) => {
                                        setSchemeDescription(e.target.value);
                                    }
                                }
                            />
                            <label for="textArea">Scheme Description</label>
                        </div>
                    </div>
                </div>
                <div className='fs-2 fw-bold text-dark'>Scheme Details</div>
                <div className="text-danger text-center fw-bold">{msg}</div>
                <div className='row'>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInput"

                                value={minAmount}
                                onChange={
                                    (e) => {

                                        setMinAmount(e.target.value)
                                        if(!minAmountRegex.test(e.target.value))
                                                {setMsg(errorMinAmount)
                                                }
                                               else{setMsg('')
                                                }

                                    }
                                }

                            />
                            <label for="floatingInput">Min Amount</label>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"

                                value={maxAmount}
                                onChange={
                                    (e) => {

                                        setMaxAmount(e.target.value)
                                        

                                    }
                                }

                            />
                            <label for="floatingInput">Max Amount</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInput"

                                value={minInvestMentTime}
                                onChange={
                                    (e) => {

                                        setMinInvestMentTime(e.target.value)
                                        if(e.target.value<2)
                                        {
                                            setMsg(errorMinTime)
                                        }
                                        else{
                                            setMsg('')
                                        }
                                    }
                                }

                            />
                            <label for="floatingInput">Min InvestMent Time(year)</label>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"


                                value={maxInvestMentTime}
                                onChange={
                                    (e) => {

                                        setMaxInvestMentTime(e.target.value)
                                       

                                    }
                                }

                            />
                            <label for="floatingInput">Max InvestMent Time(year)</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInput"

                                value={minAge}
                                onChange={
                                    (e) => {

                                        setMinAge(e.target.value)
                                         if(e.target.value<3)
                                         {
                                            setMsg(errorMinAge)
                                         }
                                         else
                                         {
                                           setMsg('')
                                         }

                                    }
                                }

                            />
                            <label for="floatingInput">Min Age</label>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"

                                value={maxAge}
                                onChange={
                                    (e) => {

                                        setMaxAge(e.target.value)

                                    }
                                }

                            />
                            <label for="floatingInput">Max Age</label>
                        </div>
                    </div>
                </div>
                <div className='fs-2 fw-bold text-dark'>Required Documents</div>
                <div className='row'>
                    <div class="col">
                        <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="AADHAR"
                          checked={documents.includes("1")}
                          onChange={(e) => handleCheckboxChange(e, "1")}
                          />
                            <label class="form-check-label" for="AADHAR">
                                AADHAR CARD
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="1"
                            id="AADHAR"
                            checked={documents.includes("2")}
                             onChange={(e) => handleCheckboxChange(e, "2")}
                            />
                            <label class="form-check-label" for="PAN">
                                PAN CARD
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                        <input
                          className="form-check-input"
                           type="checkbox"
                            value="1"
                            id="AADHAR"
                             checked={documents.includes("3")}
                             onChange={(e) => handleCheckboxChange(e, "3")}
                             />
                            <label class="form-check-label" for="PAN">
                                INCOME CERTIFICATE
                            </label>
                        </div>
                    </div>
                </div>
                <div className='fs-2 fw-bold text-dark'>Agent Details</div>
                <div className='row'>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInput"

                                value={profit}
                                onChange={
                                    (e) => {

                                        setProfit(e.target.value)

                                    }
                                }

                            />
                            <label for="floatingInput">Profit Percentage</label>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"

                                value={regCommition}
                                onChange={
                                    (e) => {

                                        setRegCommition(e.target.value)

                                    }
                                }

                            />
                            <label for="floatingInput">Registeration Commition </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput"

                                value={installmentCommission}
                                onChange={
                                    (e) => {

                                        setInstallMentCommission(e.target.value)

                                    }
                                }


                            />
                            <label for="floatingInput">Installment Commition</label>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-outline-success btn-lg"

                    onClick={
                        (e) => handleSubmit(e)
                    }

                >Submit</button>
            </form>
        </div>
    )
}

export default AddScheme