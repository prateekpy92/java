import axios from "axios";

export const addScheme = async (data) => {

    try {

        let response = await axios.post(
            'http://localhost:8081/insuranceapp/addscheme',
            data,
            {
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

export const updateScheme = async (data) => {

    console.log("update plan", data);

    try {

        let response = await axios.put(
            'http://localhost:8081/insuranceapp/Scheme', data, {
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


export const deleteScheme = async (schemeId) => {

    try {

        let response = await axios.delete(
            'http://localhost:8081/insuraceapp/Scheme', {
            params: {
                schemeId
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


export const getSchemeByPlan=(planId)=>{
    try {
        let response = axios.get(
            'http://localhost:8081/insuranceapp/scheme1',
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
