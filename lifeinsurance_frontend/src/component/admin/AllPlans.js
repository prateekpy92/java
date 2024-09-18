import React, { useEffect, useState } from 'react'
import { addPlan, allPlans, deletePlan, updatePlan } from '../../services/admin/AdminServices';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import Table from '../shared/table/Table';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import AddPlan from '../admin/AddPlan'
import EditPlan from './EditPlan';

const AllPlans = () => {


    let data = {};
    let editData = {};

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState();
    const [totalElements, setTotalElements] = useState();
    const [planName, setPlanName] = useState("")
    const [actionData, setActionData] = useState([]);
    const [editShow, setEditShow] = useState(false);
    const [planId, setPlanId] = useState();

    const [show, setShow] = useState(false);


    const [plansData, setPlansData] = useState([]);

    const getPlansData = async () => {
        try {
            let response = await allPlans(pageNumber, pageSize);
            setPlansData(response.data.content);
            setTotalPages(Math.ceil(parseInt(response.headers['plans-count']) / pageSize));
            setTotalElements(Math.ceil(parseInt(response.headers['plans-count']) / pageSize));
        }
        catch (error) {

            alert(error.response.data.message);

        }
    }




    const addPlanHandler = async () => {

        let datas = {
            planName
        }

        try {

            let response = await addPlan(datas);
            setActionData(response);
        }
        catch (error) {
            alert(error.response.data.message);
        }


    }

    const updatePlanHandler = async () => {
        try {
            let response = await updatePlan(planId, planName )
            console.log(response);
            setActionData(response);
        }
        catch (error) {
            alert(error.response.data.message);
        }

    }

    data = {
        show, setShow,
        planName, setPlanName,
        addPlanHandler
    }

    const handleUpdate = (plan) => {

        setPlanName(plan.planName);
        setPlanId(plan.planId);
        setEditShow(true);

    }

    editData = {
        planName,
        setPlanName,
        editShow,
        setEditShow,
        updatePlanHandler
    }

    const handleDelete = async (plan) => {
        try {
            let response = await deletePlan(plan.planId);
            console.log("response", response);
            setActionData(response);
            setPageNumber(0);
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    useEffect(
        () => {
            getPlansData();
        }
        , [pageNumber, pageSize, actionData])

    return (
        <>
            <Navbar></Navbar>

            <AddPlan data={data}></AddPlan>
            <EditPlan data={editData}></EditPlan>

            <div className='container'>
                <div className='row my-5'>
                    <div className='col-4'>
                        <PaginationApp
                           totalpage={totalPages}
                           setpage={setPageNumber}
                           pageNumber={pageNumber}
                        >
                        </PaginationApp>
                    </div>

                    <div className='col-4'>

                        <input className='rounded-pill px-3 text-primary fw-bold'
                            placeholder='search here'
                        ></input>

                    </div>
                    <div className='col-2 offset-2'>
                    <PageSizeSetter
                     setPageSize={setPageSize}
                     setTotalpage={setTotalPages}
                     totalrecord={totalElements}
                     pageSize={pageSize}
                     setPageNumber={setPageNumber}
                    ></PageSizeSetter>
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-10'>
                        <button className='btn btn-outline-primary fw-bold'

                            onClick={() => {
                                setShow(true);
                            }}

                        >Add A New Plan</button>
                        <Table 
                            data={plansData}
                            isDeleteButton={true}
                            isUpdateButton={true}
                            deleteFun={handleDelete}
                            UpdateFun={handleUpdate}
                        ></Table>

                    </div>

                </div>
            </div>

            <Footer></Footer>

        </>
    )
}

export default AllPlans