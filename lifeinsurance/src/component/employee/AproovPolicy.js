import React, { useEffect, useState } from 'react'
import { pandingPolicy,approvePolicy } from '../../services/policy/Policy';
import Table from '../shared/table/Table';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import PaginationApp from '../shared/page/PaginationApp'
import { successAlet, warningAlert } from '../alerts/Alert';
let val=[]
function AproovPolicy() {
    const [data,setData]=useState([])
    const [pageNumber,setPageNumber]=useState(0)
    const [pageSize,setPageSize] = useState(1);
    const [totalPages,setTotalPages]=useState();
    const [totalElements,setTotalElements]=useState()
    const [docs ,setDocs]=useState([]);
    const [action,setAction]=useState([]);
    const [show,setShow] = useState(false)
    const [render,setRender] =useState()
 
const getpolicy = async()=>
{
  let val=[]
   let response = await pandingPolicy(pageNumber);
   console.log("policy ------------",response.data.documents);
  setAction(response.data.documents)
  setTotalPages(Math.ceil(parseInt(response.headers['policy-count']) / pageSize));
  setTotalElements(Math.ceil(parseInt(response.headers['policy-count']) / pageSize));

        console.log(response);

   let detail = {
    policyId: response.data.policyId,
    schemeName:response.data.scheme.schemeName,
    issuedate:response.data.issueDate.substring(0,10),
    premiumAmount:response.data.premiumAmount,
    sumassured:response.data.sumAssured,
    premiumType:response.data.premiumType,
    status:response.data.policyStatus

   }
   val.push(detail)
  
   console.log("77777777777777",detail);

   setData(val)

  
}

const approveHandler=async(detail)=>
{
  try {
    console.log("id is sssssssssssssss",detail.policyId)
  let policyId=detail.policyId;
  let response = await approvePolicy(policyId);
  console.log("aproove response",response);
  successAlet("Policy Approved!")
  } catch (error) {
    warningAlert(error.response.data.msg)
  }
  
  //setRender(response);
}

const documentHandler=(detail)=>
{
  let val=[];
  console.log("tttttttttttt",action)
   action.forEach((a)=>
   {
     let v={
        id:a.documentId,
        DocumentName:a.documentName,
        Status:a.documentStatus,
        image:a.documentImage
      }
    val.push(v)
   }
   )
   
    setDocs(val);
    setShow(true)
}

useEffect( ()=>{
     getpolicy()
    },[pageNumber,totalPages,render])

  return (
    <>
    <Navbar></Navbar>
    <div className='row my-5 offset-2'>
                    {<div className='col-4'>
                        <PaginationApp
                           totalpage={totalPages}
                           setpage={setPageNumber}
                           pageNumber={pageNumber}
                           pageSize={pageSize}
                        >
                        </PaginationApp>
                    </div>}
    </div>
    
    <div className='col-8 offset-2'>
    <div className='h1 text-center bg-dark text-white'>Pending Policies</div>
   <Table data={data}
   isDoc={true}
   isAproov={true}
   isReject={true}
   docFun={documentHandler}
   aproovFun={approveHandler}
   rejectFun={''}

   ></Table>
  
   </div>

   {show && <div className="col-8 offset-2">
    {<div className='h1 text-bg-dark text-center'>Documents</div>}
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
    
       docs.map((value,ind) => {
        
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
   <Footer></Footer>
   </>
  )
}

export default AproovPolicy