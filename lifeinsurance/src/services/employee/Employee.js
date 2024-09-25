import axios from 'axios';

const API_URL = 'http://localhost:8081/insuranceapp';



export const EditEmployeeService = async (id, firstName, lastName, mobile, email, dateOfBirth) => {
    try {
        console.log("inside edit ", id, firstName, lastName, mobile, email, dateOfBirth, localStorage.getItem('auth'));
        let response = await axios.put(`${API_URL}/employee`, {
            id,
            firstName,
            lastName,
            mobile,
            email,
            dateOfBirth
        }, {
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const EmployeeByUsername = async (username) => {
    try {
        console.log("inside service 7777777777777777777777777777777");
        let response = await axios.get(`${API_URL}/employee`, {
            params: { username },
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllEmployee = async (pageNumber = 0, pageSize = 10) => {
    try {
        let response = await axios.get(`${API_URL}/allemployee`, {
            params: { pageNumber, pageSize },
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const saveEmployee = async (firstName, lastName, dateOfBirth, username, password, mobile, email, houseNo, apartment, city, pinCode, state) => {
    try {
        let response = await axios.post(`${API_URL}/addcustomer`, {
            firstName,
            lastName,
            dateOfBirth,
            mobile,
            email,
            username,
            password,
            houseNo,
            apartment,
            city,
            pinCode,
            state
        }, {
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        console.log("bank response is ------", response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteEmployee = async (customerId) => {
    try {
        console.log("inside delete customer");
        let response = await axios.delete(`${API_URL}/employee`, {
            params: { customerId },
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const getAllQuestions = async (pageNumber, pageSize) => {
    try {
        console.log("inside delete customer");
        let response = await axios.get(`${API_URL}/question?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
           
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};
