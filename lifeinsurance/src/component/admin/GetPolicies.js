import React, { useEffect, useState } from 'react';
import { getAllAccounts } from '../../services/policy/Policy';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import Table from '../shared/table/Table';
import Payments from '../customer/Payments';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

function GetPolicies() {
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

  const allAccounts = async () => {
    try {
      const response = await getAllAccounts(pageNumber, pageSize);
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      
      const val = response.data.content.map(element => ({
        policyNo: element.policyNo,
        Username: element.username,
        SchemeName: element.insuranceScheme,
        Status: element.status,
        payments: Array.isArray(element.payments) ? 
          element.payments.map(payment => payment.paymentId) : []
      })).filter(item => item !== null);
      
      setAccount(val);
    } catch (error) {
      console.error('Failed to fetch accounts:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    allAccounts();
  }, [pageNumber, pageSize]);

  const documentHandler = (detail) => {
    const foundDoc = data.find(x => x.policyNo === detail.policyNo);
    if (foundDoc) {
      const docData = Array.isArray(foundDoc.submittedDocuments) ? 
        foundDoc.submittedDocuments.map(doc => ({
          id: doc.documentId,
          DocumentName: doc.documentName,
          Status: doc.documentStatus,
          image: doc.documentImage
        })) : [];
      setDocs(true);
      setNominee(false);
      setDetail([]);
      setDocShow(docData);
      setShow(false);
    }
  };

  const detailHandler = (detail) => {
    const foundDetail = data.find(x => x.policyNo === detail.policyNo);
    if (foundDetail) {
      const detailData = [{
        SumAssured: foundDetail.sumAssured,
        IssueDate: foundDetail.issueDate.substring(0, 10),
        MaturityDate: foundDetail.maturityDate.substring(0, 10),
        Premium: foundDetail.premiumAmount,
        PremiumType: foundDetail.premiumType
      }];
      setDetail(detailData);
      setDocs(false);
      setNominee(false);
      setAction([]);
      setShow(false);
    }
  };

  const nomineeHandler = (detail) => {
    const foundDetail = data.find(x => x.policyNo === detail.policyNo);
    if (foundDetail) {
      setNominee(true);
      setAction(foundDetail.nominees || []);
      setDetail([]);
      setDocs(false);
      setShow(false);
    }
  };

  const paymentHandler = (detail) => {
    const foundDetail = data.find(x => x.policyNo === detail.policyNo);
    if (foundDetail) {
      const paymentData = (foundDetail.payments || []).map(p => ({
        ...p,
        paymentDate: p.paymentDate ? p.paymentDate.substring(0, 10) : ''
      }));
      setPayment(paymentData);
      setShow(true);
      setAction([]);
      setDetail([]);
      setDocs(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row my-5'>
          <div className='offset-2 col-2'>
            <PaginationApp
              totalPage={totalPages}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
            />
          </div>
          <div className='col-3 offset-1'>
            <input
              className='rounded-pill px-3 text-primary fw-bold'
              placeholder='search here'
            />
          </div>
          <div className='col-2'>
            <PageSizeSetter
              setPageSize={setPageSize}
              totalRecord={totalElements}
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
        {detail.length > 0 && (
          <div className='row'>
            <div className='col-8 offset-2 table-responsive mb-5'>
              <div className='h1 text-bg-dark text-center my-5'>Account Detail</div>
              <Table data={detail} />
            </div>
          </div>
        )}
        {action.length > 0 && (
          <div className='row'>
            <div className='col-8 offset-2 table-responsive mb-5'>
              {nominee && <div className='h1 text-bg-dark text-center my-5'>Nominees</div>}
              <Table data={action} />
            </div>
          </div>
        )}
        {docShow.length > 0 && (
          <div className='col-8 offset-2'>
            <div className='h1 text-bg-dark text-center my-5'>Documents</div>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>DOCUMENTID</th>
                  <th scope='col'>DOCUMENTNAME</th>
                  <th scope='col'>STATUS</th>
                  <th scope='col'>IMAGE</th>
                </tr>
              </thead>
              <tbody>
                {docShow.map((value) => (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.DocumentName}</td>
                    <td>{value.Status}</td>
                    <td>
                      <img
                        src={`http://localhost:8081/insuranceapp/download?file=${value.image}`}
                        alt='scheme image'
                        className='img-fluid shadow-lg'
                        style={{ height: '15rem', width: '15rem' }}
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
          <div className='text-center fw-bold text-danger fs-1'>No Customer Found</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default GetPolicies;
