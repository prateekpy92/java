import React, { useEffect, useState } from 'react'
import { agentClaimApprove, agentClaims, policyClaimed, policyClaims } from '../../services/admin/AdminServices';
import { Navigate, useNavigate } from 'react-router-dom';
import { successAlet, warningAlert } from '../alerts/Alert';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

const AgentClaims = () => {

    const [agents, setAgents] = useState([]);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [agentsClaim, setAgentsClaim] = useState([]);
    const [policies, setPolicies] = useState([])
    const [agentId, setAgentId] = useState();
    const [claimId, setClaimId] = useState();
    const [responseData,setResponseData]=useState();

    const agnetClamHandler = async () => {
        try {
            let response = await agentClaims();
            console.log("agents claims0000---------------------00000000000000000",response);
            setAgents(response.data)
            setShow1(true);
            setShow2(false)
        }
        catch (error) {
            warningAlert("some error occured")
        }



    }



    const policyClaimHandler = async () => {
        try {
            setShow2(true);
            setShow1(false);
            let response = await policyClaims();
            console.log(response);
            setPolicies(response.data);
        }
        catch (error) {

            warningAlert("some error occured")

        }
    }

    const claimHandler = (agent) => {

        setAgentsClaim(agent.claims);

    }

    const agentClaimApproveHandler = async(claim) => {
        let data = {
            agentId,
            claimId:claim.claimId
        }

        if(claim.claimStatus=="APPROVED"){
            warningAlert("Already Approved");
            return ;
        }

        try {
            console.log("data",claim);
           let response= await agentClaimApprove(data);
           setResponseData(response);
           if(response){
            successAlet("claim approved");
            
           }
        }
        catch (error) {
            warningAlert("claim approve failed")
        }
    }

    const polciyApproveClaimHandler=async(policy)=>{

        try{
            console.log(policy)
           let response=await  policyClaimed(policy.policyNo);
           if(response){
            successAlet("policy claimed")
           }
        }
        catch(error){

            warningAlert("claim approve failed")

        }

    }

    useEffect(()=>{

        if(show1){
            agnetClamHandler();
        }
        else{
            policyClaimHandler();
        }

    },[responseData])

    const navigate = new useNavigate();
    return (
        <>
            <Navbar></Navbar>
            <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-2'>
                        <button className='border-0 btn-outline-danger btn mt-3'

                            active={show1}

                            onClick={agnetClamHandler}

                        >
                            <div class="card background1" >
                                <div class="card-body" >
                                    <h5 class="card-title fs-1 fw-bold py-3 text-white">Agent Claims</h5>

                                </div>
                            </div>
                        </button>
                        <button className='border-0 btn-outline-danger btn mt-3 '

                            onClick={
                                policyClaimHandler
                            }

                        >
                            <div class="card background1" >
                                <div class="card-body" >
                                    <h5 class="card-title fs-1 fw-bold py-3 text-white">Policy Claims</h5>

                                </div>
                            </div>
                        </button>
                        <button className='border-0 btn-outline-danger btn mt-3'

                            onClick={
                                () => navigate('/admin')
                            }

                        >
                            <div class="card background1" >
                                <div class="card-body" >
                                    <h5 class="card-title fs-1 fw-bold py-3 text-white"> Go To Dashboard</h5>

                                </div>
                            </div>
                        </button>
                    </div> */}
                    <div className='col-8 offset-2'>
                        {

                            show1 ?
                                <div>
                                    <div className='fs-2 col-12 fw-bold text-white bg-dark text-center m-5'>
                                        CLAIMS
                                    </div>
                                    <table class="table table-bordered table-info">
                                        <thead>
                                            <tr>
                                                <th scope="col">AGENT ID</th>
                                                <th scope="col">FIRST NAME</th>
                                                <th scope="col">LAST NAME</th>
                                                <th scope="col">TOTAL COMMISSION</th>
                                                <th scope="col">DETAILS</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                agents.map(
                                                    (agent) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{agent.agentId}</th>
                                                                <td>{agent.userDetails.firstName}</td>
                                                                <td>{agent.userDetails.lastName}</td>
                                                                <td>{agent.totalCommission}</td>
                                                                <td><button className='btn btn-lg btn-outline-success'

                                                                    onClick={
                                                                        () => {
                                                                            claimHandler(agent)
                                                                            setAgentId(agent.agentId);
                                                                        }
                                                                    }

                                                                >SHOW MORE</button></td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }

                                        </tbody>
                                    </table>


                                    {
                                        agentsClaim.length > 0 ?
                                            <>
                                                <div className='fs-2 fw-bold text-white text-center bg-dark mt-5'>
                                                    DETAILS
                                                </div>

                                                <table class="table table-bordered table-info">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">CLAIMS ID</th>
                                                            <th scope="col">CLAIM AMOUNT</th>
                                                            <th scope="col">DATE</th>
                                                            <th scope="col">CLAIM STATUS</th>
                                                            <th scope="col">ACTION</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            agentsClaim.map(
                                                                (claim) => {
                                                                    return (
                                                                        <tr>
                                                                            <th scope="row">{claim.claimId}</th>
                                                                            <td>{claim.claimAmount}</td>
                                                                            <td>{claim.date}</td>
                                                                            <td>{claim.status}</td>
                                                                            <td><button className='btn btn-lg btn-outline-success'

                                                                                onClick={
                                                                                    () => {

                                                                                        setClaimId(claim.claimId)
                                                                                        agentClaimApproveHandler(claim)
                                                                                    }
                                                                                }

                                                                            >{claim.tatus=="PENDING"?"Approve":"APPROVED"}</button></td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }

                                                    </tbody>
                                                </table>


                                            </> : null
                                    }

                                </div> : null
                        }

                        {
                            // show2 ?
                            //     <>

                            //         <div className='fs-2 fw-bold text2 text-center mt-5'>
                            //             Policy Claim
                            //         </div>

                            //         <table class="table table-striped">
                            //             <thead>
                            //                 <tr>
                            //                     <th scope="col">Policy Id</th>
                            //                     <th scope="col">Claim Amount</th>
                            //                     <th scope="col">Issue Date</th>
                            //                     <th scope="col">Maturity Date</th>
                            //                     <th scope="col">Action</th>
                            //                 </tr>
                            //             </thead>

                            //             <tbody>
                            //                 {
                            //                     policies.map(
                            //                         (policy) => {
                            //                             return (
                            //                                 <tr>
                            //                                     <th scope="row">{policy.policyNo}</th>
                            //                                     <td>{policy.claims.claimAmount}</td>
                            //                                     <td>{policy.issueDate.substr(0, 10)}</td>
                            //                                     <td>{policy.maturityDate.substr(0, 10)}</td>
                            //                                     <td><button className='btn btn-lg btn-outline-success'

                            //                                         onClick={
                            //                                             () => {
                            //                                                 polciyApproveClaimHandler(policy)
                            //                                             }
                            //                                         }

                            //                                     >Approve</button></td>
                            //                                 </tr>
                            //                             )
                            //                         }
                            //                     )
                            //                 }

                            //             </tbody>
                            //         </table>

                            //     </> : null
                        }

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default PolicyClaims