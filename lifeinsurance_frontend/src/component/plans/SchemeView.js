import React, { useState } from 'react'
import image from '../../images/login.jpg'
import { useNavigate } from 'react-router-dom';
import { successAlet, warningAlert } from '../alerts/Alert';
import { GetAllAgent } from '../../services/agent/Agent';
import { addImage } from '../../services/files/File';
import { addPolicy } from '../../services/policy/Policy';


const SchemeView = (data) => {
    data = data.data;
    console.log("required scheme data", data);
    console.log(data.requierdDocs);
    let requierdDocs = data.requierdDocs==null?[]:data.requierdDocs;
    const [value, setValue] = useState(false);
    const [clickCalculate, setClickCalculate] = useState(false);
    const [duration, setDuration] = useState()
    const [investMent, setinvestment] = useState()
    const [preimumType, setPremiumType] = useState()
    const [premiumAmount, setPreimumAmount] = useState();
    const [profitAmount, setProfitAmount] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [profitRatio, setProfitRatio] = useState(data.profitRatio);
    const [totalPremum, setTotalPremiums] = useState();
    const [buy, setBuy] = useState(false);
    const [image, setImage] = useState(data.schemeImage);
    const [nominee, setNominee] = useState();
    const [nomineeName, setNomineeName] = useState("");
    const [nomineeRelation, setNomineeRelation] = useState("");
    const [documentImage, setDocumentImage] = useState("");
    const [agents, setAgents] = useState([]);
    const [agentId, setAgentId] = useState(0);
    const [policyDocuments, setPolicyDocuments] = useState([]);
    const schemeId = data.schemeId;
    // let policyDocuments = [];
    let nomineeList = [];

    for (let i = 0; i < nominee; i++) {

        if (i == 0) {
            nomineeList = [];
        }

        nomineeList.push(i);

    }

    const [valid, setValid] = useState(false);

    const navigate = new useNavigate();

    const validateUser = () => {
        if (localStorage.getItem('auth') == null || localStorage.getItem('Role') == null || localStorage.getItem('Role') != 'ROLE_CUSTOMER') {
            warningAlert("you are not logged in")
            localStorage.clear();
            navigate('/login');
        }
        setValid(true);
    }

    const calculateHandler = () => {

        let totalInvestMent = investMent;
        let profit = (totalInvestMent * profitRatio) / 100;
        let premium = (totalInvestMent) / (preimumType * duration);
        setTotalPremiums(totalInvestMent / premium);
        setPreimumAmount(premium)
        setProfitAmount((totalInvestMent * profitRatio) / 100);
        setTotalAmount(Number(profit) + Number(totalInvestMent));
    }
    const getAgentsData = async () => {
        let response = await GetAllAgent(0, 30);
        setAgents(response.data.content);
        console.log(response);
    }

    const buyHandler = () => {

        validateUser();

        if (valid) {

            setBuy(true);
            getAgentsData();

        }

    }

    const uploadHandler = async (doc) => {
        console.log(doc)
        console.log(documentImage);
        try {
            let data = new FormData();
            data.append("file", documentImage);
            let response = await addImage(data);
            policyDocuments.push({
                documentName: doc,
                documentImage: response.data
            }
            )
            if (response) {
                successAlet("image successfully uploaded")
            }
        }
        catch (error) {

            warningAlert("image not uploaded")

        }


    }

    nomineeList.push(
        {
            nomineeName: nomineeName,
            nomineeRelation: nomineeRelation
        }
    )

    const policyData = {

        schemeId,
        agentId,
        username: localStorage.getItem('username'),
        duration,
        premiumType:preimumType,
        investMent,
        nominees: nomineeList,
        docs: policyDocuments

    }

    const handleSubmit = async () => {
        try {
            console.log(policyData);
            let response = await addPolicy(policyData);

            console.log(response);
            if (response) {
                successAlet("policy successfully submitted")
            }
        }
        catch (error) {
            warningAlert("some error occured ")
        }
    }

    return (
        <div className='my-5'>
            <div className='offset-1 p-2 col-10 text-center fs-2 bg-warning mb-5'>
                {
                    data.schemeName
                }
            </div>

            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-6'>
                        <div className=' p-5'>
                            
                            {
                                data.description
                            }
                        </div>
                        <div className='text-dark'>Required Documents

                            <ul>
                                {
                                    requierdDocs.map(
                                        (document) => {
                                            return <li>{document}</li>
                                        }
                                    )
                                }
                            </ul>

                        </div>
                    </div>
                    <div className='col-6  text-center'>
                        <img src={"http://localhost:8081/insuranceapp/download?file=" + image} alt="scheme image " className='img-fluid shadow-lg' style={{
                            height: "20rem",
                            width: "20rem"
                        }}></img>
                    </div>

                    <div className='col-12 text-center shadow-lg mt-5'>
                        <div class="row mt-5">
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={data.minAge} />
                                    <label for="floatingInput">Minimum Age</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={data.maxAge} />
                                    <label for="floatingInput">Maximum Age</label>
                                </div>
                            </div>

                        </div>

                        <div class="row mt-2">
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={data.minAmount} />
                                    <label for="floatingInput">Minimum InvestMent</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={data.maxAmount} />
                                    <label for="floatingInput">Maximum InvestMent</label>
                                </div>
                            </div>

                        </div>

                        <div class="row mt-2">
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={data.minDuration} />
                                    <label for="floatingInput">Minimum Duration </label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={data.maxDuration} />
                                    <label for="floatingInput">Maximum Duration</label>
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingInput" value={profitRatio} />
                                    <label for="floatingInput">Profit Ratio</label>
                                </div>
                            </div>

                        </div>

                        <button className='btn btn-primary btn-lg fw-bold mb-5'

                            onClick={
                                () => setValue(true)
                            }

                        >Check This Policy</button>

                    </div>
                    {
                        value ?
                            <div className='col-12 text-center shadow-lg mt-5'>
                                <div class="row mt-5">
                                    <div class="col">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput"
                                                value={duration}
                                                onChange={
                                                    (e) => {
                                                        setDuration(e.target.value);
                                                    }
                                                }

                                            />
                                            <label for="floatingInput"> Number Of Years</label>
                                        </div>
                                    </div>

                                </div>

                                <div class="row mt-2">
                                    <div class="col-12 bg1">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput"

                                                value={investMent}
                                                onChange={
                                                    (e) => {
                                                        setinvestment(e.target.value);
                                                    }
                                                }

                                            />
                                            <label for="floatingInput">Total InvestMent</label>
                                        </div>
                                    </div>


                                </div>

                                <div class="row mt-2">
                                    <div class="col">
                                        <select class="form-select py-3" aria-label="Default select example"

                                            onChange={
                                                (e) => {
                                                    setPremiumType(e.target.value)
                                                }
                                            }

                                        >
                                            <option selected>Premium Type</option>
                                            <option value="12">Monthly</option>
                                            <option value="4">Quarterly</option>
                                            <option value="2">Half Yearly</option>
                                            <option value="1">Yearly</option>
                                        </select>
                                    </div>

                                </div>

                                <button className='btn btn-primary btn-lg fw-bold my-3'

                                    onClick={
                                        () => {
                                            setClickCalculate(true)
                                            calculateHandler()
                                        }
                                    }

                                >Calculate Premium</button>

                            </div> : null
                    }
                    {
                        clickCalculate ?

                            <div className='col-12 text-center shadow-lg mt-5 py-4 '>

                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="floatingInput" value={premiumAmount} />
                                        <label for="floatingInput">InstallMent Amount</label>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="floatingInput" value={profitAmount} />
                                        <label for="floatingInput">Profit Amount</label>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="floatingInput" value={totalAmount} />
                                        <label for="floatingInput">Total Amount</label>
                                    </div>
                                </div>

                                <button className='btn btn-primary btn-lg fw-bold my-3'

                                    onClick={
                                        () => {

                                            buyHandler();
                                        }
                                    }

                                >Buy Policy</button>

                            </div>



                            : null

                    }
                    {
                        buy ?
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-12 p-3 shadow-lg mt-4'>
                                        <div class="row mt-2">
                                            <div class="col">
                                                <div class="form-floating mb-3">
                                                    <input type="number" class="form-control" id="floatingInput" value={totalPremum} />
                                                    <label for="floatingInput">Total Premiums </label>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form mb-3 align-items-center">
                                                    <select class="form-select py-3" aria-label="Default select example"
                                                        onChange={
                                                            (e) => {

                                                                setAgentId(e.target.value);

                                                            }
                                                        }>
                                                        <option selected>Need Agent</option>
                                                        <option value={0}>No! Self</option>
                                                        {
                                                            agents.map(
                                                                (agent) => {

                                                                    return <option value={agent.id}>{agent.firstName + " " + agent.lastName}</option>

                                                                }
                                                            )
                                                        }


                                                    </select>


                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form-floating mb-3">
                                                    <input type="number" class="form-control" id="floatingInput" value={1}

                                                        onChange={
                                                            (e) => {

                                                                setNominee(e.target.value);

                                                            }
                                                        }
                                                    />
                                                    <label for="floatingInput">Number Of Nominee</label>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row mt-2">
                                            <div class="col">
                                                <div class="form-floating mb-3">
                                                    <input type="text" class="form-control" id="floatingInput"

                                                        value={nomineeName}

                                                        onChange={
                                                            (e) => {

                                                                setNomineeName(e.target.value);

                                                            }
                                                        }

                                                    />
                                                    <label for="floatingInput">Nominee Name </label>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="form mb-3 align-items-center">
                                                    <select class="form-select py-3" aria-label="Default select example"
                                                        onChange={
                                                            (e) => {

                                                                setNomineeRelation(e.target.value);

                                                            }
                                                        }>
                                                        <option selected>Relation</option>
                                                        <option value="BROTHER">Brother</option>
                                                        <option value="SISTER">Sister</option>
                                                        <option value="MOTHER">Mother</option>
                                                        <option value="FATHER">Father</option>
                                                    </select>


                                                </div>
                                            </div>

                                        </div>

                                        {
                                            requierdDocs.map(
                                                (doc) => {

                                                    return <div class="row mt-2">
                                                        <div class="col">
                                                            <div class="form-floating mb-3">
                                                                <input type="text" class="form-control" id="floatingInput"

                                                                    value={doc}


                                                                />
                                                                <label for="floatingInput">Document Name </label>
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div>
                                                                <div class="mb-3 d-flex">
                                                                    <input class="form-control py-3" type="file" id="formFile"

                                                                        onChange={
                                                                            (e) => {
                                                                                setDocumentImage(e.target.files[0]);
                                                                            }
                                                                        }

                                                                    />
                                                                    <button type='button' className='btn  btn-primary fw-bold' onClick={() => uploadHandler(doc)}>Upload</button>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                }
                                            )
                                        }
                                        <div className='text-center'>

                                            <button className='btn btn-lg btn-primary fw-bold'

                                                onClick={
                                                    () => {
                                                        handleSubmit()
                                                    }
                                                }

                                            >Submit</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>

        </div>
    )
}

export default SchemeView