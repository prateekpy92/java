import React, { useEffect, useState } from 'react';
import { deleteEmployee, getAllEmployees, saveEmployee } from '../../services/admin/AdminServices';
import Table from '../shared/table/Table';
import Navbar from '../shared/navbar/Navbar';
import PaginationApp from '../shared/page/PaginationApp';
import PageSizeSetter from '../shared/page/PageSizeSetter';
import AddEmployee from './AddEmployee';
import { EditEmployeeService } from '../../services/employee/Employee';
import EditEmployee from './EditEmployee';
import axios from "axios";

const AllEmployee = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState();
    const [totalElements, setTotalElements] = useState();
    const [employeeData, setEmployeeData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [id, setId] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [salary, setSalary] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [show, setShow] = useState(false);
    const [actionData, setActionData] = useState("");
    const [add, setAdd] = useState(false);

    const data = {
        firstName,
        lastName,
        mobileNumber,
        salary,
        username,
        password,
        email,
        dateOfBirth,
        houseNo,
        apartment,
        city,
        state,
        pincode
    };

    const addEmployeeHandler = async () => {
        let response = await saveEmployee(data);
        console.log(response);
    };

    const addEmployeeData = {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        mobileNumber,
        setMobileNumber,
        salary,
        setSalary,
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        dateOfBirth,
        setDateOfBirth,
        houseNo,
        setHouseNo,
        apartment,
        setApartment,
        city,
        setCity,
        state,
        setState,
        pincode,
        setPincode,
        show: add,
        setShow: setAdd,
        addEmployeeHandler
    };

    const getEmployeesData = async () => {
        let response = await getAllEmployees(pageNumber, pageSize);
        setEmployeeData(response.data.content);
        setTotalPages(Math.ceil(parseInt(response.headers['employee-count']) / pageSize));
        setTotalElements(parseInt(response.headers['employee-count']));

        
    };

    const handleDelete = async (employee) => {
        try {
            let response = await deleteEmployee(employee.employeeId);
            setActionData(response);
            getEmployeesData();
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete employee: " + (error.response?.data?.message || error.message));
        }
    };

    const updateEmployee = (employee) => {
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmail(employee.email);
        setMobileNumber(employee.mobileNumber);
        setId(employee.employeeId);
        setShow(true);
    };

    const EditData = async () => {
        try {
            let response = await EditEmployeeService(
                id,
                firstName,
                lastName,
                mobileNumber,
                email,
                dateOfBirth
            );
            alert("Employee updated successfully!");
            setActionData(response);
        } catch (error) {
            alert(error.response);
        }
    };

    const handleToggleStatus = async (employee) => {
        try {
            const newStatus = !employee.isActive;
            const response = await updateEmployeeStatus(employee.employeeId, newStatus);
            setActionData(response);
            getEmployeesData();
        } catch (error) {
            console.error("Status change failed:", error);
            alert("Failed to change employee status: " + (error.response?.data?.message || error.message));
        }
    };

    const updateEmployeeStatus = async (employeeId, isActive) => {
        const response = await axios.post(`http://localhost:8081/insuranceapp/employee1?employeeId=${employeeId}&isActive=${isActive}`, {}, {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        });
        return response.data;
    };

    useEffect(() => {
        getEmployeesData();
    }, [pageNumber, pageSize]);

    const filteredEmployeeData = employeeData.filter(employee =>
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeId.toString().includes(searchQuery)
    );

    return (
        <>
            <Navbar />
            {show && (
                <EditEmployee
                    firstName={firstName}
                    lastName={lastName}
                    mobile={mobileNumber}
                    email={email}
                    dob={dateOfBirth}
                    show={show}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setMobile={setMobileNumber}
                    setEmail={setEmail}
                    setShow={setShow}
                    setDateOfBirth={setDateOfBirth}
                    editData={EditData}
                />
            )}
            {add && (
                <AddEmployee data={addEmployeeData} />
            )}
            <div className='background2 text-center display-3 py-3 text-white fw-bold'>All Employees</div>
            <div className='container'>
                <div className='row my-5'>
                    <div className='col-4 offset-1'></div>
                    <div className='col-4'>
                        <input
                            className='rounded-pill px-3 text-primary fw-bold'
                            placeholder='Search by ID or Name'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                    <div className='col-12'>
                        <button className='btn btn-lg btn-primary fw-bold m-2'
                            onClick={() => setAdd(true)}
                        >
                            Add A New Employee
                        </button>
                    </div>
                    <div className='col-12'>
                        <Table
                            data={filteredEmployeeData}
                            isDeleteButton={false}
                            isUpdateButton={true}
                            UpdateFun={updateEmployee}
                            handleToggleStatus={handleToggleStatus}
                        />
                    </div>
                </div>
            </div>
            <PaginationApp
                totalpage={totalPages}
                setpage={setPageNumber}
                pageNumber={pageNumber}
            />
        </>
    );
};

export default AllEmployee;
