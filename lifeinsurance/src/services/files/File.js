import axios from "axios";

export const addImage=async (data)=>{
    try {

        let response = await axios.post(
            'http://localhost:8081/insuranceapp/upload', data, {
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