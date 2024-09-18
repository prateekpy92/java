import axios from "axios"
export const getAllEmployees = async (pageNumber, pageSize) => {

    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/allemployee',
            {
                params: {
                    pageNumber,
                    pageSize
                }
                ,
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }

}

export const saveEmployee = async (data) => {

    try {
           console.log("emp service is--------->");
        let response = await axios.post(
            'http://localhost:8081/insuranceapp/addemployee', data, {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        }

        )

        return response;
    } catch (error) {

        throw error;

    }


}

export const deleteEmployee = async (employeeId) => {

    try {

        let response = await axios.delete(
            'http://localhost:8081/insuranceapp/employee', {
            params: {
                employeeId
            },
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        }
        )

        return response;
    } catch (error) {
        throw error;
    }

}

export const allPlans = (pageNumber, pageSize) => {

    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/allPlan',
            {
                params: {
                    pageNumber,
                    pageSize
                }
                ,
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }

}

export const addPlan = async (data) => {

    try {

        let response = await axios.post(
            'http://localhost:8081/insuranceapp/addPlan', data, {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        }

        )

        return response;
    } catch (error) {

        throw error;

    }

}

export const updatePlan = async (planId,planName) => {

    console.log("update plan",planId,planName);

    try {

        let response = await axios.put(
            'http://localhost:8081/insuranceapp/plan',{
            planId,
            planName,
           },
           
            {headers:{
                Authorization:localStorage.getItem('auth')
            }
            }

        )

        return response;
    } catch (error) {

        throw error;

    }

}

export const deletePlan=async (planId)=>{

    try {

        let response = await axios.delete(
            'http://localhost:8081/insuranceapp/Plan', {
            params: {
                planId
            },
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        }
        )

        return response;
    } catch (error) {
        throw error;
    }

}

export const getSchemeByPlanId=(planId)=>{
    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/scheme',
            {
                params: {
                    planId
                }
                ,
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }
}

export const getSchemedetail=(id)=>{
    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/schemeDetail',
            {
                params: {
                    id
                }
                ,
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }
}

export const agentClaims=()=>{
    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/agentClaims',
            {
                
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }
}

export const policyClaims=()=>{
    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/policyClaims',
            {
                
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }
}

export const agentClaimApprove = async (data) => {

    try {

        let response = await axios.post(
            'http://localhost:8081/insuranceapp/agentClaimApprove', data, {
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        }

        )

        return response;
    } catch (error) {

        throw error;

    }

}

export const policyClaimed=(policyId)=>{
    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/policyClaimApprove',
            {
                params: {
                    policyId
                }
                ,
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response;

    }
    catch (error) {
        throw error;
    }
}