import React, { useEffect, useState } from 'react'
import { getAccounts } from '../../services/customer/CustomerService';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import Table from '../shared/table/Table'
import Payments from './Payments';
import Navbar from '../shared/navbar/Navbar'
import Footer from '../shared/footer/Footer'
  


function ShowAccounts() {

const [account,setAccount] =useState([])
const [pageNumber, setPageNumber] = useState(0);
const [pageSize, setPageSize] = useState(2);
const [totalPages, setTotalPages] = useState();
const [totalElements, setTotalElements] = useState();
const [data, setData] = useState([])
const [docs,setDocs] = useState(false);
const [nominee,setNominee]=useState(false);
const [action,setAction]=useState([]);
const [show,setShow]=useState(false);
const [detail ,setDetail]=useState([]);
const [payment,setpayment]=useState([]);
const [docShow, setDocShow]=useState()


const allAccounts=async()=>
{
    let val =[];
    let response=await getAccounts(pageNumber,pageSize,localStorage.getItem('username'));
    setData(response.data.content);
    console.log("resp000 ",response.data.content,"oooooo",response.headers['customer-account'])
    setTotalPages(Math.ceil(parseInt(response.headers['customer-account']) / pageSize));
    setTotalElements(Math.ceil(parseInt(response.headers['customer-account']) / pageSize));
    console.log("status value is ss",response.data.content.status)
    response.data.content.forEach((element) => {
    let v={
        policyNo:element.policyNo,
        SchemeName:element.insuranceScheme,
        Status:element.status
    }
      val.push(v)
  
    });
    setAccount(val);

}

let documentHandler=((detail)=>{
  let d=null;
  let val=[]; 
  data.forEach((x)=>
 {
  if(x.policyNo==detail.policyNo)
    d=x;
 })
   d=d.submittedDocuments;
    console.log("d----------090",d)
    d.forEach((x)=>{
     let v={
        id:x.documentId,
        DocumentName:x.documentName,
        Status:x.documentStatus,
        image:x.documentImage
      }
    val.push(v)
    })
    console.log("val data is0000000000000000000000000",val)
    setDocs(true);
    setNominee(false)
    setDetail(false)
    setDocShow(val)
    setShow(false)
    
    
}
)


const detailHandler=((detail)=>{
 let val = [];
 let value=null;
 data.forEach((x)=>
 {
  if(x.policyNo==detail.policyNo)
    value=x;
 })
 console.log("n111111111111 ",value.nominees)
 setNominee(value.nominees)
  let p={
     SumAssured:value.sumAssured,
     IssueDate:value.issueDate.substring(0, 10),
     maturityDate:value.maturityDate.substring(0, 10),
     Premium:value.premiumAmount,
     premiumType:value.premiumType
  }
   val.push(p);

setDetail(val)
setDocs(false);
setNominee(false)
setAction([])
setShow(false)
 

}
)

const nomineeHandler=(detail)=>
{
  let val = [];
 let value=null;
 data.forEach((x)=>
 {
  if(x.policyNo==detail.policyNo)
    value=x;
 })
   console.log("nominee 999",value.nominees)
   setNominee(true)
   setAction(value.nominees);
   setDetail([])
   setDocs(false)
   setShow(false)
}

const paymentHandler=(detail)=>
{
  let val = [];
 let value=null;
 data.forEach((x)=>
 {
  if(x.policyNo==detail.policyNo)
    value=x;
 })
 console.log("payments =====",value.payments)
 value.payments.forEach((p)=>
 {
  p.paymentDate=p.paymentDate.substring(0,10);
 })
 setpayment(value.payments)
 setShow(true);
 setAction(false)
 setDetail(false)
 setDocs(false)
}

useEffect(
()=>{
allAccounts()
},[pageNumber,totalElements,pageSize])



return (
 <>
 <Navbar></Navbar>

  <div className='conatiner'>
   

      <div className='row my-5'>
          <div className='offset-2 col-2'>
          <PaginationApp
              totalpage={totalPages}
              setpage={setPageNumber}
              pageNumber={pageNumber}
            ></PaginationApp>
          </div>

          <div className='col-3 offset-1'>

              <input className='rounded-pill px-3 text-primary fw-bold'
                  placeholder='search here'
              ></input>

          </div>
          <div className='col-2'>
          <PageSizeSetter
              setPageSize={setPageSize}
              setTotalpage={setTotalPages}
              totalrecord={totalElements}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            ></PageSizeSetter>
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
                   ></Table>
            </div>
          </div>

      
    <div className='row'>
         {detail!=0?
          <div className='col-8 offset-2 table-responsive mb-5'>
           
             <div className='h1 text-bg-dark text-center my-5'>Account Detail</div>
              <Table 
              data={detail}
              isClaim={true}
              claimFun={''}
              ></Table>
          </div>:null}
      </div>

      <div className='row'>
        {action!=0?
          <div className='col-8 offset-2 table-responsive mb-5'>
            {nominee && <div className='h1 text-bg-dark text-center my-5'>Nominees</div>}
              <Table 
              data={action}
              ></Table>
          </div>:null}
      </div>
    </div>

    {docShow &&<div className="col-8 offset-2">
    {<div className='h1 text-bg-dark text-center my-5'>Documents</div>}
      <table class="table">
  <thead>
    <tr>
      <th scope="col">DOCUMENTID</th>
      <th scope="col">DOCUMENTNAME</th>
      <th scope="col">STATUS</th>
      <th scope="col">IMAGE</th>
    </tr>
  </thead>
  <tbody>
    {  
    
       docShow.map((value,ind) => {
        
        return (
          
            <tr key={ind}>
              <td>{value.id}</td>
              <td>{value.DocumentName}</td>
              <td>{value.Status}</td>
              <td><img src={"http://localhost:8081/insuranceapp/download?file=" + value.image} alt="scheme image " className='img-fluid shadow-lg' style={{
                            height: "15rem",
                            width: "15rem"
                        }}></img></td>
                
            </tr>
        )
      }
     )
} 
  </tbody>
</table>

    </div>}
    {show!=0? <div>
    <div className='h1 offset-2 col-8 text-bg-dark text-center my-5'>Payment</div>
    <Payments data={payment}></Payments>
    </div>:null}
  {
      account==0?
      <div className='text-center fw-bold text-danger fs-1'> No Customer Found </div>:null
  }

   <Footer></Footer> 
</>
  )
}

export default ShowAccounts