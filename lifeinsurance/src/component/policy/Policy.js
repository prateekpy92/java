import React, { useEffect, useState } from 'react';
import { getAccounts } from '../../services/customer/CustomerService';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import Table from '../shared/table/Table';
import Payments from '../customer/Payments'; 
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { addPayment, getClaim, paylist } from '../../services/policy/Policy';
import AddPayment from './AddPayment';
import { successAlet, warningAlert } from '../alerts/Alert'; 
import Claim from './Claim';

function ShowAccounts() {
  const [account, setAccount] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [action, setAction] = useState([]);
  const [show, setShow] = useState(false);
  const [payment, setPayment] = useState([]);
  const [policyId, setPolicyId] = useState(0);
  const [paymentId, setPaymentId] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [amount, setAmount] = useState(0);
  const [show1, setShow1] = useState(false);
  const [claim, setClaim] = useState(false);
  const [claimAmount, setClaimAmount] = useState(0);
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [show2, setShow2] = useState(false);

  // Fetch accounts based on pageNumber and pageSize
  const allAccounts = async () => {
    try {
      let response = await getAccounts(pageNumber, pageSize, localStorage.getItem('username'));
      console.log("API Response:", response.data); // Log the entire response for debugging

      if (response && response.data) {
        // Check if response.data has 'content' or not
        const accountsData = response.data.content || [];
        setData(accountsData);
        setTotalPages(Math.ceil(parseInt(response.headers['customer-account'], 10) / pageSize));
        setTotalElements(parseInt(response.headers['customer-account'], 10));

        let val = accountsData.map((element) => ({
          policyNo: element.policyNo,
          SchemeName: element.insuranceScheme,
          Status: element.status
        }));

        setAccount(val);
      } else {
        console.error('Unexpected response structure', response.data);
        setAccount([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

 
  const getPayments = async () => {
    if (policyId !== 0) {
      try {
        let payments = await paylist(policyId);
        let flag = true;
        payments.data.forEach((p) => {
          p.paymentDate = p.paymentDate.substring(0, 10);
          if (p.paymentStatus === "UNPAID") flag = false;
        });
        setClaim(flag);
        setPayment(payments.data);
        setShow(true);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    }
  };


  const paymentHandler = (detail) => {
    setPolicyId(detail.policyNo);
  };

  
  const payInHandler = async () => {
    try {
      let pay = await addPayment({
        username: localStorage.getItem('username'),
        policyId,
        paymentId,
        paymentType,
        amount,
        cardNumber,
        cvv,
        expiry
      });
      setAction(pay);
      successAlet("Payment Done!");
    } catch (error) {
      warningAlert(error.response?.data?.message || error.message);
    }
  };

  
  const applyClaim = async () => {
    try {
      let response = await getClaim({
        policyId,
        claimAmount,
        bankName,
        branchName,
        bankAccountNumber: accountNo,
        ifscCode
      });
      console.log("Claim response:", response);
    } catch (error) {
      console.error('Error applying claim:', error);
    }
  };

  useEffect(() => {
    allAccounts();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    getPayments();
  }, [action, policyId]);

  const claimHandler = () => {
    setShow2(true);
    const selectedAccount = data.find(a => a.policyNo === policyId);
    if (selectedAccount) setClaimAmount(selectedAccount.sumAssured);
  };

  const d1 = {
    show: show1,
    setShow: setShow1,
    paymentType,
    amount,
    paymentId,
    cardNumber,
    cvv,
    expiry,
    setPaymentType,
    setPaymentId,
    setCardNumber,
    setCvv,
    setExpiry,
    payInHandler
  };

  const d2 = {
    show: show2,
    setShow: setShow2,
    claimAmount,
    bankName,
    branchName,
    bankAccountNumber: accountNo,
    ifscCode,
    setBankName,
    setBranchName,
    setIfscCode,
    setAccountNo,
    setClaimAmount,
    applyClaim
  };

  return (
    <>
      <Navbar />

      <div className='container'>
        {show2 && <Claim data={d2} />}
        {show1 && <AddPayment data={d1} />}

        <div className='row my-5'>
          <div className='offset-2 col-2'>
            <PaginationApp
              totalpage={totalPages}
              setpage={setPageNumber}
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
              setTotalpage={setTotalPages}
              totalrecord={totalElements}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-8 offset-2 table-responsive mb-5'>
            <div className='h1 text-bg-dark text-center my-5'>Customer Account</div>
            <Table
              data={account}
              isPayment={true}
              paymentFun={paymentHandler}
            />
          </div>
        </div>

        {claim && (
          <div className='offset-2 col-1 py-2 btn btn-large btn-primary fw-bold' onClick={claimHandler}>
            CLAIM
          </div>
        )}

        {show && (
          <div>
            <div className='row'>
              <div className='h1 offset-2 col-8 text-bg-dark text-center my-5'>Payments</div>
              <Payments data={payment} />
            </div>
          </div>
        )}

        {account.length === 0 && (
          <div className='text-center fw-bold text-danger fs-1'>No Account Found</div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ShowAccounts;
