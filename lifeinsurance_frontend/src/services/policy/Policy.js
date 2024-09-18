// import axios from "axios";


// export const addPolicy = async (data) => {
//     try {
//         let response = await axios.post(
//             'http://localhost:8081/insuranceapp/addpolicy',
//             data,
//             {
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error adding policy:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// export const getPolicy = async (pageNumber, username) => {
//     try {
//         let response = await axios.get(
//             'http://localhost:8081/insuranceapp/policy',
//             {
//                 params: { pageNumber, username },
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error fetching policy:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// export const getAllAccounts = async (pageNumber, pageSize) => {
//     try {
//         let response = await axios.get(
//             'http://localhost:8081/insuranceapp/allpolicy',
//             {
//                 params: { pageNumber, pageSize },
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error fetching all accounts:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };



// // export const addPayment = async (username) => {
// //     try {
// //         const response = await axios.get(
// //             'http://localhost:8081/insuranceapp/payments',
// //             {
// //                 params: { username },  // Pass username as a query parameter
// //                 headers: {
// //                     Authorization: localStorage.getItem('auth'),
// //                     'Content-Type': 'application/json'
// //                 }
// //             }
// //         );
// //         return response.data; // Return the data from the response
// //     } catch (error) {
// //         console.error("Error fetching payments:", error.response ? error.response.data : error.message);
// //         throw error;  // Rethrow the error to be handled by the component
// //     }
// // };

// export const addPayment = async () => {
//     try {
//         const username = localStorage.getItem('username');
//         const token = localStorage.getItem('auth');

//         if (!username) {
//             throw new Error('Username not found in localStorage');
//         }

//         if (!token) {
//             throw new Error('Authorization token not found');
//         }

//         const response = await axios.get(
//             'http://localhost:8081/insuranceapp/payments',
//             {
//                 params: { username },
//                 headers: {
//                                       Authorization: localStorage.getItem('auth'),
//                                          'Content-Type': 'application/json'
//                                      }
//             }
//         );

//         return response.data;
//     } catch (error) {
//         console.error("Error fetching payments:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// // // Example paymentDto
// // const paymentDto = {
// //     username: localStorage.getItem('username'),
// //     policyId: 1234,
// //     paymentId: 5678,
// //     paymentType: 'Credit Card',
// //     amount: 100.00,
// //     cardNumber: '4111111111111111',
// //     cvv: 123,
// //     expiry: '12/24'
// // };
// export const pandingPolicy = async (pageNumber) => {
//     try {
//         let response = await axios.get(
//             'http://localhost:8081/insuranceapp/PendingPolicy',
//             {
//                 params: { pageNumber },
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error fetching pending policy:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// export const paylist = async (policyId) => {
//     try {
//         let response = await axios.get(
//             'http://localhost:8081/insuranceapp/payments',
//             {
//                 params: { policyId },
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error fetching payment list:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// export const approvePolicy = async (policyId) => {
//     try {
//         console.log("id in service:", policyId);
//         let response = await axios.get(
//             'http://localhost:8081/insuranceapp/approvePolicy',
//             {
//                 params: { policyId },
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error approving policy:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// export const getClaim = async (param1) => {
//     try {
//         console.log("params are:", param1);
//         let response = await axios.post(
//             'http://localhost:8081/insuranceapp/claimPolicy',
//             param1,
//             {
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error getting claim:", error.response ? error.response.data : error.message);
//         throw error;
//     }

// };
// export const getAllAccounts1 = async (pageNumber, pageSize) => {
//     try {
//         let response = await axios.get(
//             'http://localhost:8081/insuranceapp/customers-by-agent/{agentId}',
//             {
//                 params: { pageNumber, pageSize },
//                 headers: {
//                     Authorization:localStorage.getItem('auth')
//                 }
//             }
//         );
//         return response;
//     } catch (error) {
//         console.error("Error fetching all accounts:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };
import axios from "axios";

export const addPolicy=async (data)=>{
    try {

        let response = await axios.post(
            'http://localhost:8081/insuranceapp/addpolicy', data, {
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

export const getPolicy=async(pageNumber,pageSize,username)=>{
    try {
        if (username === undefined || username === null) {
            throw new Error('Username parameter is required');
        }
        const response = await axios.get(
            'http://localhost:8081/insuranceapp/policy',
            {
                params: {
                    pageNumber,
                    pageSize,
                    username
                }
                ,
                headers: {
                    Authorization:localStorage.getItem('auth')
                }
            }

        )

        return response.data;

    }
    catch (error) {
        console.error('Error fetching policy:', error.message);
       
        throw error;
    }

}

export const getAllAccounts=async(pageNumber,pageSize)=>{
    try {
        
        const response = await axios.get(
            'http://localhost:8081/insuranceapp/allpolicy',
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




    // export const addPayment=async (param)=>{
    //     try {
    //          console.log("params are-----------------",param)
    //         let response = await axios.post(
    //             'http://localhost:8080/insuranceapp/payments',param,
    //               {
    //             headers: {
    //                 Authorization:localStorage.getItem('auth')
    //               }
    //             }    
                
    //         )
    
    //         return response;
    //     } catch (error) {
    
    //         throw error;
    
    //     }
    // }

    export const pandingPolicy = async (pageNumber) => {
        try {
            // Make the GET request to fetch pending policies
            let response = await axios.get(
                'http://localhost:8081/insuranceapp/PendingPolicy',
                {
                    params: { pageNumber },
                    headers: {
                        Authorization: localStorage.getItem('auth') 
                    }
                }
            );
    
            // Check if the response data is valid
            if (!response.data || response.data.length === 0) {
                console.warn('No policies found for the given page number.');
            }
    
            return response;
        } catch (error) {
            // Log detailed error information
            console.error('Error fetching pending policies:', error.response ? error.response.data : error.message);
            
            // Display user-friendly error message
            if (error.response && error.response.status === 400) {
                alert('No pending policies available at this moment.');
            } else {
                alert('An error occurred while fetching policies. Please try again later.');
            }
    
            throw error;  // Rethrow error after logging
        }
    }

export const addPayment = async () => {
    try {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('auth');

        if (!username || !token) {
            throw new Error('Missing authentication details');
        }

        const response = await axios.get(
            'http://localhost:8081/insuranceapp/payments',
            {
                params: { username },
                headers: {
                                    Authorization:localStorage.getItem('auth')
                                  }
            }
        );
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching payments:", error.response ? error.response.data : error.message);
        throw error;  // Rethrow the error to be handled by the component
    }
};


    export const paylist=async (policyId)=>{
    
        let response = await axios.get(
            'http://localhost:8081/insuranceapp/payments',{
             params:
              {
                policyId
              },
            headers: {
                Authorization:localStorage.getItem('auth')
              }
            } 
            
        )

        return response;
    
}


export const approvePolicy=async (policyId)=>{
    try {
        console.log("id in service==",policyId)
        let response = await axios.get(
            'http://localhost:8081/insuranceapp/approvePolicy',{
             params:
              {
                policyId
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


export const getClaim=async (param1)=>{
    try {
         console.log("params are-----------------",param1)
        let response = await axios.post(
            'http://localhost:8081/insuranceapp/claimPolicy',param1,
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

export const getAllAccounts1 = async (pageNumber, pageSize) => {
        try {
            let response = await axios.get(
                'http://localhost:8081/insuranceapp/customers-by-agent/{agentId}',
                {
                    params: { pageNumber, pageSize },
                    headers: {
                        Authorization:localStorage.getItem('auth')
                    }
                }
            );
            return response;
        } catch (error) {
            console.error("Error fetching all accounts:", error.response ? error.response.data : error.message);
            throw error;
        }
    };