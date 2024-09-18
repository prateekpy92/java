import React, { useEffect, useState } from 'react'

const PlanCard = (data) => {
    let schemehandler=data.schemehandler;
    data=data.data;
    const [planId, setPlanId] = useState(data.planId);
    const [planName, setPlanName] = useState(data.planName);

    const getSchemesData=async()=>{

        schemehandler(data);
        

    }

    return (
        <div className='col-3 mt-2'>
           <button className='btn btn-danger p-5  fs-1  fw-bold'
           onClick={
            ()=>getSchemesData()
           }
           >
            {data.planName}
           </button>
        </div>

    )
}

export default PlanCard