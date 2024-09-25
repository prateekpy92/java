import React, { useEffect, useState } from 'react'
import { allPlans } from '../../services/admin/AdminServices'
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import PlanCard from './PlanCard'
import BuyPlan from './SchemeView'
import SchemeView from './SchemeView';
import { getSchemeByPlan } from '../../services/scheme/SchemeService';


const Plans = () => {

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [plans, setPlans] = useState([]);
    const [schemeData,setSchemeData]=useState([]);
    const [planName,setPlanName]=useState(false);


    const getPlans = async () => {


        let response = await allPlans(pageNumber, pageSize);
        console.log(response);
        setPlans(response.data.content);

    }
    const schemehandler = async (data) => {
        try {
            let response = await getSchemeByPlan(data.planId);
            setPlanName(data.planName);
            setSchemeData(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error fetching schemes:", error.response ? error.response.data : error.message);
        }
    }

    useEffect(
        () => {
            getPlans();
        }
        , []
    )


    return (
        <div>

            <Navbar></Navbar>

            <div className='background2 text-center display-3 py-3 text-white fw-bold'>All Plans</div>
            <div className='container'>
                <div className='row my-5'>
                    {
                        plans.map(
                            (plan) => {
                                return <PlanCard data={plan}
                                schemehandler={schemehandler}
                                ></PlanCard>
                            }
                        )
                    }
                </div>
            </div>

            {
                planName? <div className='background2 text-center display-3 text-white fw-bold'>Schemes Under {planName}</div>:
                <div className='text-center fs-2 fw-bold text-danger'> Please Select A Plan To View Scehemes </div>
            }

           {
            schemeData?
            <>
              {
                schemeData.map(
                    (scheme)=>{
                        return (
                            <SchemeView data={scheme}>

                            </SchemeView>
                        )
                    }
                )
              }
            </>
            :null
           }

            <Footer></Footer>

        </div>
    )
}

export default Plans