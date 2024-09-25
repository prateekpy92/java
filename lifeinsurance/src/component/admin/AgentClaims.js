import React, { useEffect, useState } from "react";
import {
  agentClaimApprove,
  agentClaims,
  policyClaims,
} from "../../services/admin/AdminServices";
import { successAlet, warningAlert } from "../alerts/Alert";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

const AgentClaims = () => {
  const [agents, setAgents] = useState([]);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [agentsClaim, setAgentsClaim] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [agentId, setAgentId] = useState();
  const [claimId, setClaimId] = useState();
  const [responseData, setResponseData] = useState();

  const agnetClamHandler = async () => {
    try {
      let response = await agentClaims();
      if (Array.isArray(response.data)) {
        setAgents(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
        warningAlert("Unexpected response format for agents.");
      }
      setShow1(true);
      setShow2(false);
    } catch (error) {
      warningAlert("Some error occurred while fetching agent claims.");
    }
  };

  const policyClaimHandler = async () => {
    try {
      setShow2(true);
      setShow1(false);
      let response = await policyClaims();
      setPolicies(response.data);
    } catch (error) {
      warningAlert("Some error occurred while fetching policy claims.");
    }
  };

  const claimHandler = (agent) => {
    if (agent.claims && Array.isArray(agent.claims)) {
      setAgentsClaim(agent.claims);
      setAgentId(agent.agentId);
    } else {
      warningAlert("No claims available for this agent.");
      setAgentsClaim([]); 
    }
  };

  const agentClaimApproveHandler = async (claim) => {
    let data = {
      agentId,
      claimId: claim.claimId,
    };

    if (claim.claimStatus === "APPROVED") {
      warningAlert("Already Approved");
      return;
    }

    try {
      let response = await agentClaimApprove(data);
      setResponseData(response);
      if (response) {
        successAlet("Claim approved");
        agnetClamHandler();
      }
    } catch (error) {
      warningAlert("Claim approval failed");
    }
  };

  useEffect(() => {
    if (show1) {
      agnetClamHandler();
    } else {
      policyClaimHandler();
    }
  }, [responseData, show1]);

  return (
    <>
      <Navbar />
      <div className='bg-warning text-center display-3 py-3 text-dark fw-bold'>Agent Claims</div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 offset-2">
            {show1 ? (
              <div>
                <div className="fs-2 fw-bold text-white bg-dark text-center mt-5">
                  CLAIMS
                </div>
                <table className="table table-bordered table-info">
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
                    {agents.map((agent) => (
                      <tr key={agent.agentId}>
                        <th scope="row">{agent.agentId}</th>
                        <td>{agent.userDetails.firstName}</td>
                        <td>{agent.userDetails.lastName}</td>
                        <td>{agent.totalCommission}</td>
                        <td>
                          <button
                            className="btn btn-lg btn-outline-success"
                            onClick={() => {
                              claimHandler(agent);
                              setAgentId(agent.agentId);
                            }}
                          >
                            SHOW MORE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {agentsClaim.length > 0 ? (
                  <>
                    <div className="fs-2 fw-bold text-white text-center bg-dark mt-5">
                      DETAILS
                    </div>
                    <table className="table table-bordered table-info">
                      <thead>
                        <tr>
                          <th scope="col">CLAIMS ID</th>
                          <th scope="col">CLAIM AMOUNT</th>
                          <th scope="col">DATE</th>
                          <th scope="col">CLAIM STATUS</th>
                          <th scope="col">ACCEPT</th>
                          <th scope="col">REJECT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agentsClaim.map((claim) => (
                          <tr key={claim.claimId}>
                            <th scope="row">{claim.claimId}</th>
                            <td>{claim.claimAmount}</td>
                            <td>{claim.date}</td>
                            <td>{claim.status}</td>
                            <td>
                              <button
                                className="btn btn-lg btn-outline-success"
                                onClick={() => agentClaimApproveHandler(claim)}
                              >
                                {claim.status === "PENDING" ? "APPROVE" : "APPROVED"}
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-lg btn-outline-danger"
                                onClick={() => {
                                  warningAlert("Rejection functionality not implemented.");
                                }}
                              >
                                {claim.status === "PENDING" ? "REJECT" : ""}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="text-center">No claims available for this agent.</div>
                )}
              </div>
            ) : null}

            {show2 ? (
              <>
                <div className='fs-2 fw-bold text2 text-center mt-5'>Policy Claim</div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Policy Id</th>
                      <th scope="col">Claim Amount</th>
                      <th scope="col">Issue Date</th>
                      <th scope="col">Maturity Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policies.map((policy) => (
                      <tr key={policy.policyNo}>
                        <th scope="row">{policy.policyNo}</th>
                        <td>{policy.claims.claimAmount}</td>
                        <td>{policy.issueDate.substr(0, 10)}</td>
                        <td>{policy.maturityDate.substr(0, 10)}</td>
                        <td>
                          <button
                            className='btn btn-lg btn-outline-success'
                            onClick={() => {
                              warningAlert("Policy approval functionality not implemented.");
                            }}
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentClaims;
