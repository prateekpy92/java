import React, { useEffect, useState } from 'react';
import { getAccounts } from '../../services/customer/CustomerService';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import Table from '../shared/table/Table';
import Payments from './Payments';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

function ShowAccounts() {
    const [account, setAccount] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState();
    const [totalElements, setTotalElements] = useState();
    const [data, setData] = useState([]);
    const [docs, setDocs] = useState(false);
    const [nominee, setNominee] = useState(false);
    const [action, setAction] = useState([]);
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState([]);
    const [payment, setPayment] = useState([]);
    const [docShow, setDocShow] = useState([]);

    const allAccounts = async () => {
        try {
            let val = [];
            let response = await getAccounts(pageNumber, pageSize, localStorage.getItem('username'));
            
            // Log the full response to inspect its structure
            console.log("Full API Response:", response);

            // Ensure we safely access the data and headers
            const content = response.data?.content || [];
            const customerAccountHeader = response.headers['customer-account'] || '0';
            console.log("Processed Accounts:", val);
            setAccount(val);
            
            setData(content);
            setTotalPages(Math.ceil(parseInt(customerAccountHeader) / pageSize));
            setTotalElements(Math.ceil(parseInt(customerAccountHeader) / pageSize));

           
            if (Array.isArray(content)) {
                content.forEach((element) => {
                    if (element && element.status !== undefined) {
                        let v = {
                            policyNo: element.policyNo,
                            SchemeName: element.insuranceScheme,
                            Status: element.status
                        };
                        val.push(v);
                    }
                });
                setAccount(val);
            } else {
                console.error("Unexpected content format:", content);
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
           
        }
    };

    let documentHandler = (detail) => {
        let d = null;
        let val = [];
        data.forEach((x) => {
            if (x.policyNo === detail.policyNo) d = x;
        });
        if (d && d.submittedDocuments) { 
            d.submittedDocuments.forEach((x) => {
                let v = {
                    id: x.documentId,
                    DocumentName: x.documentName,
                    Status: x.documentStatus,
                    image: x.documentImage
                };
                val.push(v);
            });
            console.log("val data is", val);
            setDocs(true);
            setNominee(false);
            setDetail(false);
            setDocShow(val);
            setShow(false);
        }
    };

    const detailHandler = (detail) => {
        let val = [];
        let value = null;
        data.forEach((x) => {
            if (x.policyNo === detail.policyNo) value = x;
        });
        console.log("Detail:", value);
        setNominee(value ? value.nominees : []);
        let p = {
            SumAssured: value ? value.sumAssured : null,
            IssueDate: value ? value.issueDate.substring(0, 10) : null,
            maturityDate: value ? value.maturityDate.substring(0, 10) : null,
            Premium: value ? value.premiumAmount : null,
            premiumType: value ? value.premiumType : null
        };
        val.push(p);

        setDetail(val);
        setDocs(false);
        setNominee(false);
        setAction([]);
        setShow(false);
    };

    const nomineeHandler = (detail) => {
        let val = [];
        let value = null;
        data.forEach((x) => {
            if (x.policyNo === detail.policyNo) value = x;
        });
        console.log("Nominee:", value ? value.nominees : []);
        setNominee(true);
        setAction(value ? value.nominees : []);
        setDetail([]);
        setDocs(false);
        setShow(false);
    };

    const paymentHandler = (detail) => {
        let val = [];
        let value = null;
        data.forEach((x) => {
            if (x.policyNo === detail.policyNo) value = x;
        });
        console.log("Payments:", value ? value.payments : []);
        if (value && value.payments) {
            value.payments.forEach((p) => {
                p.paymentDate = p.paymentDate.substring(0, 10);
            });
            setPayment(value.payments);
            setShow(true);
            setAction(false);
            setDetail(false);
            setDocs(false);
        }
    };

    useEffect(() => {
        console.log("Fetching accounts with:", { pageNumber, pageSize });
        allAccounts();
    }, [pageNumber, totalElements, pageSize]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row my-5'>
                    <div className='offset-2 col-2'>
                        <PaginationApp
                            totalpage={totalPages}
                            setpage={setPageNumber}
                            pageNumber={pageNumber}
                        />
                    </div>
                    <div className='col-3 offset-1'>
                        <input className='rounded-pill px-3 text-primary fw-bold' placeholder='search here' />
                    </div>
                    <div className='col-2'>
                        <PageSizeSetter
                            setPageSize={setPageSize}
                            setTotalpage={setTotalPages}
                            totalrecord={totalElements}
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
                            docFun={documentHandler}
                            paymentFun={paymentHandler}
                            detailFun={detailHandler}  
                            nomineeFun={nomineeHandler}        
                        />
                    </div>
                </div>
                <div className='row'>
                    {detail.length !== 0 ? (
                        <div className='col-8 offset-2 table-responsive mb-5'>
                            <div className='h1 text-bg-dark text-center my-5'>Account Detail</div>
                            <Table 
                                data={detail}
                                isClaim={true}
                                claimFun={''}
                            />
                        </div>
                    ) : null}
                </div>
                <div className='row'>
                    {action.length !== 0 ? (
                        <div className='col-8 offset-2 table-responsive mb-5'>
                            {nominee && <div className='h1 text-bg-dark text-center my-5'>Nominees</div>}
                            <Table 
                                data={action}
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            {docShow.length > 0 && (
                <div className="col-8 offset-2">
                    <div className='h1 text-bg-dark text-center my-5'>Documents</div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">DOCUMENTID</th>
                                <th scope="col">DOCUMENTNAME</th>
                                <th scope="col">STATUS</th>
                                <th scope="col">IMAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docShow.map((value, ind) => (
                                <tr key={ind}>
                                    <td>{value.id}</td>
                                    <td>{value.DocumentName}</td>
                                    <td>{value.Status}</td>
                                    <td>
                                        <img 
                                            src={"http://localhost:8081/insuranceapp/download?file=" + value.image} 
                                            alt="scheme image" 
                                            className='img-fluid shadow-lg' 
                                            style={{ height: "15rem", width: "15rem" }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {show && (
                <div>
                    <div className='h1 offset-2 col-8 text-bg-dark text-center my-5'>Payment</div>
                    <Payments data={payment} />
                </div>
            )}
            {account.length === 0 && (
                <div className='text-center fw-bold text-danger fs-1'> No Customer Found </div>
            )}
            <Footer /> 
        </>
    );
}

export default ShowAccounts;
