import React, { useEffect, useState } from "react";
import { GetAllPlans } from "../../services/plans/PlanService";
import Table from "../shared/table/Table";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

const Plan = () => {
  const [data, setData] = useState([]);
  const [plan,setPlan] = useState();
  const [planName,setPlanName]=useState();
  

  const getPlanData = async () => {
    let response = await GetAllPlans(0, 10);
    setData(response.data.content);
  };

  const updatePlan =() =>{
    
  }

  const deletePlan=()=>{


  }


  useEffect(() => {
    getPlanData();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid">
        <div className="row bg1">
          <div className="text-center text-danger display-1 fw-bold py-3">
            Insurance Plans
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-8 offset-2">
            <Table data={data} isUpdateButton={true} isDeleteButton={true} UpdateFun={updatePlan} deleteFun={deletePlan}></Table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Plan;
