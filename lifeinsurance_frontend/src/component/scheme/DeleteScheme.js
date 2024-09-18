import React, { useEffect, useState } from 'react'
import { allPlans, getSchemeByPlan } from '../../services/admin/AdminServices';
import { deleteScheme } from '../../services/scheme/SchemeService';

const DeleteScheme = () => {
    const [planId, setPlanId] = useState("");
    const [schemeId, setSchemeId] = useState("");
    const [plans, setPlans] = useState([]);
    const [schemes, setSchemes] = useState([]);

    const getPlanData = async () => {

        let response = await allPlans(0, 30);

        setPlans(response.data.content);

    }

    const getSchemeData = async () => {
        let response = await getSchemeByPlan(planId);
        console.log(response.data);
        setSchemes(response.data);


    }

    const deleteHandler=async()=>{

        let response=await deleteScheme(schemeId);
        if(response){
            alert("scheme deleted successfully")
        }

    }

    useEffect(
        () => {
            if (planId != "")
                getSchemeData();
        }
        , [planId]
    )

    useEffect(
        () => {

            getPlanData();

        }
        , []
    )

    return (
        <div>
            <div className='fs-2 fw-bold text-dark'>Plan Details</div>
            <div className='row'>
                <div class="col">
                    <select class="form-select py-3" aria-label="Default select example"
                        onChange={
                            (e) => {
                                setPlanId(e.target.value);
                            }
                        }
                    >
                        <option selected>select plan</option>
                        {
                            plans.map(
                                (plan) => {
                                    return <option value={plan.planId}>{plan.planName}</option>
                                }
                            )
                        }

                    </select>
                </div>
                <div class="col">
                    <select class="form-select py-3" aria-label="Default select example"
                        onChange={
                            (e) => {
                                setSchemeId(e.target.value);
                            }
                        }
                    >
                        <option selected>select Scheme</option>
                        {
                            schemes.map(
                                (scheme) => {
                                    return <option value={scheme.schemeId}>{scheme.schemeId + " " + scheme.schemeName}</option>
                                }
                            )
                        }

                    </select>
                </div>
                <button className='btn btn-lg btn-outline-danger mt-5' onClick={deleteHandler}>Delete Scheme</button>
            </div>
        </div>
    )
}

export default DeleteScheme