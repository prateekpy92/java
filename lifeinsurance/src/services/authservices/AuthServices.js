
import axios from "axios"

export const loginService= async (userName,password,roleType)=>{
       
     const response = await axios.post(`http://localhost:8081/insuranceapp/login`,{
        
            userName,
            password,
            roleType
        
     })
     const { token, customerId } = response.data; 
     localStorage.setItem('customerId', customerId);

     return response;
      
}

export const validateUser= async (authToken)=>{
     try{
   
     console.log("inside validator >>>>>>>>>>>>>>>>>>>>>>>>>>>>>",authToken)
   
   let response = await axios.get(`http://localhost:8081/insuranceapp/validator`,{
   
     headers:
     {
       Authorization: authToken
     }
   
   
   })
   
   console.log("response value is ----------------",response)
   return response;
   } catch (error) {
     throw error
   }
   
   }
 
const BASE_URL = 'http://localhost:8081/insuranceapp';

export const requestOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to send OTP');
  }
};

export const verifyOtpAndResetPassword = async (email, otp, newPassword, confirmPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-otp`, {
      email,
      otp,
      newPassword,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to reset password');
  }
};