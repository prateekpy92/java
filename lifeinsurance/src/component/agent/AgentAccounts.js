import React, { useEffect, useState } from 'react';
import { getAgentPolicies } from '../../services/agent/Agent'; // Ensure this service is correctly defined
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import Table from '../shared/table/Table';
import Payments from '../customer/Payments';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

function AgentAccounts() {
    const [account, setAccount] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [data, setData] = useState([]);
    const [docs, setDocs] = useState(false);
    const [nominee, setNominee] = useState(false);
    const [action, setAction] = useState([]);
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState([]);
    const [payment, setPayment] = useState([]);
    const [docShow, setDocShow] = useState([]);

    const fetchPolicies = async () => {
        try {
            let agentId = localStorage.getItem('agentId');
            
            if (!agentId) {
                console.log("Agent ID not found in localStorage. Fetching from API...");
                const agentResponse = await getAgentPolicies(pageNumber, pageSize, 'agent3');
                
                if (agentResponse.data && agentResponse.data.id) {
                    agentId = agentResponse.data.id;
                    localStorage.setItem('agentId', agentId);
                } else {
                    console.error("Failed to fetch agent ID from API");
                    return;
                }
            }

            const response = await getAgentPolicies(pageNumber, pageSize, agentId);
            
            if (response.data) {
                setData(response.data.content || []);
                setTotalPages(response.data.totalPages || 0);
                setTotalElements(response.data.totalElements || 0);
                
                const transformedData = response.data.content.map(element => ({
                    policyNo: element.policyNo,
                    Username: element.username,
                    SchemeName: element.insuranceScheme,
                    Status: element.status
                }));
                setAccount(transformedData);
            } else {
                console.error("Unexpected API response structure:", response);
            }
        } catch (error) {
            console.error("Error fetching agent policies:", error.response ? error.response.data : error.message);
        }
    };

    const handleDocument = (detail) => {
        const selectedPolicy = data.find(x => x.policyNo === detail.policyNo);
        if (selectedPolicy) {
            const docsData = selectedPolicy.submittedDocuments.map(doc => ({
                id: doc.documentId,
                DocumentName: doc.documentName,
                Status: doc.documentStatus,
                image: doc.documentImage
            }));
            setDocs(true);
            setNominee(false);
            setDetail([]);
            setDocShow(docsData);
            setShow(false);
        }
    };

    const handleDetail = (detail) => {
        const selectedPolicy = data.find(x => x.policyNo === detail.policyNo);
        if (selectedPolicy) {
            const policyDetail = [{
                SumAssured: selectedPolicy.sumAssured,
                IssueDate: selectedPolicy.issueDate.substring(0, 10),
                MaturityDate: selectedPolicy.maturityDate.substring(0, 10),
                Premium: selectedPolicy.premiumAmount,
                PremiumType: selectedPolicy.premiumType
            }];
            setDetail(policyDetail);
            setDocs(false);
            setNominee(false);
            setAction([]);
            setShow(false);
        }
    };

    const handleNominee = (detail) => {
        const selectedPolicy = data.find(x => x.policyNo === detail.policyNo);
        if (selectedPolicy) {
            setNominee(true);
            setAction(selectedPolicy.nominees);
            setDetail([]);
            setDocs(false);
            setShow(false);
        }
    };

    const handlePayment = (detail) => {
        const selectedPolicy = data.find(x => x.policyNo === detail.policyNo);
        if (selectedPolicy) {
            const paymentsData = selectedPolicy.payments.map(p => ({
                ...p,
                paymentDate: p.paymentDate.substring(0, 10)
            }));
            setPayment(paymentsData);
            setShow(true);
            setAction([]);
            setDetail([]);
            setDocs(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, [pageNumber, pageSize]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row my-5'>
                    <div className='offset-2 col-2'>
                        <PaginationApp
                            totalPages={totalPages}
                            setPageNumber={setPageNumber}
                            pageNumber={pageNumber}
                        />
                    </div>
                    <div className='col-3 offset-1'>
                        <input className='rounded-pill px-3 text-primary fw-bold' placeholder='search here' />
                    </div>
                    <div className='col-2'>
                        <PageSizeSetter
                            setPageSize={setPageSize}
                            setTotalPages={setTotalPages}
                            totalRecords={totalElements}
                            pageSize={pageSize}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 offset-2 table-responsive'>
                        <div className='h1 text-bg-dark text-center'>Customer Account</div>
                        <Table
                            data={account}
                            isDoc={true}
                            isPayment={true}
                            showMoreButton={true}
                            isNominee={true}
                            docFun={handleDocument}
                            paymentFun={handlePayment}
                            detailFun={handleDetail}
                            nomineeFun={handleNominee}
                        />
                    </div>
                </div>
                {detail.length > 0 &&
                    <div className='row'>
                        <div className='col-8 offset-2 table-responsive mb-5'>
                            <div className='h1 text-bg-dark text-center my-5'>Account Detail</div>
                            <Table data={detail} />
                        </div>
                    </div>
                }
                {action.length > 0 &&
                    <div className='row'>
                        <div className='col-8 offset-2 table-responsive mb-5'>
                            {nominee && <div className='h1 text-bg-dark text-center my-5'>Nominees</div>}
                            <Table data={action} />
                        </div>
                    </div>
                }
                {docShow.length > 0 &&
                    <div className="row">
                        <div className='col-8 offset-2'>
                            <div className='h1 text-bg-dark text-center my-5'>Documents</div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">DOCUMENT ID</th>
                                        <th scope="col">DOCUMENT NAME</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">IMAGE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {docShow.map((value, index) => (
                                        <tr key={index}>
                                            <td>{value.id}</td>
                                            <td>{value.DocumentName}</td>
                                            <td>{value.Status}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:8081/insuranceapp/download?file=${value.image}`}
                                                    alt={value.DocumentName}
                                                    className='img-fluid shadow-lg'
                                                    style={{ height: "15rem", width: "15rem" }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {show &&
                    <div className='row'>
                        <div className='col-8 offset-2'>
                            <div className='h1 text-bg-dark text-center my-5'>Payment</div>
                            <Payments data={payment} />
                        </div>
                    </div>
                }
                {account.length === 0 &&
                    <div className='text-center fw-bold text-danger fs-1'>No Customer Found</div>
                }
            </div>
            <Footer />
        </>
    );
}

export default AgentAccounts;
