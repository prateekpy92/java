import React, { useEffect, useState } from "react";
import {
  agentClaimApprove,
  agentClaims,
  policyClaimed,
  policyClaims,
} from "../../services/admin/AdminServices";
import { successAlet, warningAlert } from "../alerts/Alert";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

const AgentClaims = () => {
  const [show2, setShow2] = useState(false);
  const [policies, setPolicies] = useState([]); // Ensure it's an array
  const [claimId, setClaimId] = useState();
  const [responseData, setResponseData] = useState();

  const policyClaimHandler = async () => {
    try {
      setShow2(true);
      let response = await policyClaims();
      console.log(response);
      setPolicies(Array.isArray(response.data) ? response.data : []); // Ensure the response is an array
    } catch (error) {
      warningAlert("some error occurred");
    }
  };

  const polciyApproveClaimHandler = async (policy) => {
    try {
      console.log(policy);
      let response = await policyClaimed(policy.policyNo);
      if (response) {
        setResponseData(response);
        successAlet("policy claimed");
      }
    } catch (error) {
      warningAlert("claim approve failed");
    }
  };

  useEffect(() => {
    policyClaimHandler();
  }, [responseData]);

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-warning text-center display-3 py-3 text-dark fw-bold">
        Employee Dashboard
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 offset-2">
            {show2 ? (
              <>
                {policies && policies.length !== 0 ? ( // Check if policies is an array and not empty
                  <div>
                    <div className="fs-2 fw-bold bg-dark  text-white text-center mt-5">
                      POLICY CLAIMS
                    </div>

                    <table className="table table-bordered table-info">
                      <thead>
                        <tr>
                          <th scope="col">POLICY ID</th>
                          <th scope="col">CLAIM AMOUNT</th>
                          <th scope="col">ISSUE DATE</th>
                          <th scope="col">MATURITY DATE</th>
                          <th scope="col">ACCEPT</th>
                          <th scope="col">REJECT</th>
                        </tr>
                      </thead>

                      <tbody>
                        {policies.map((policy) => (
                          <tr key={policy.policyNo}>
                            <th scope="row">{policy.policyNo}</th>
                            <td>{policy.claims ? policy.claims.claimAmount : "No Claim"}</td>
                            <td>{policy.issueDate ? policy.issueDate.substr(0, 10) : "N/A"}</td>
                            <td>{policy.maturityDate ? policy.maturityDate.substr(0, 10) : "N/A"}</td>
                            <td>
                              <button
                                className="btn btn-lg btn-outline-success"
                                onClick={() => polciyApproveClaimHandler(policy)}
                              >
                                APPROVE
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-lg btn-outline-danger">
                                REJECT
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-danger fs-1 fw-bold mt-5">
                    No Policy Claimed!
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AgentClaims;
