import axios from "axios";



export const getAllCustomer = async (pageNumber = 0, pageSize = 10) => {
  try {
    const token = localStorage.getItem('auth');
    
    if (!token) {
      console.error('No token found in localStorage');
      throw new Error('Authorization token is missing');
    }

    console.log('Token:', token);

    const response = await axios.get('http://localhost:8081/insuranceapp/getAllCustomers', {
      params: {
        pageNumber,
        pageSize
      },
      headers: {
        Authorization:localStorage.getItem('auth')
    }
    });

    console.log('API Response:', response.data);

    return response;
  } catch (error) {
    console.error('Failed to fetch customer data:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error for further handling
  }
};


// Function to save a new customer
export const saveCustomer = async (data) => {
  try {
    let response = await axios.post('http://localhost:8081/insuranceapp/addcustomer', data, {
      headers: {
        Authorization:localStorage.getItem('auth')
    }
    });
    console.log("Customer registration response:", response);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to update a customer's information
export const updateCustomerService = async (data) => {
  try {
    console.log("Data values are:", data);
    let response = await axios.put('http://localhost:8081/insuranceapp/editCustomer', data, {
      headers: {
        Authorization:localStorage.getItem('auth')
    }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to delete a customer
export const deleteCustomerService = async (customerId) => {
  try {
    console.log("Inside delete customer");
    let response = await axios.delete('http://localhost:8081/insuranceapp/customer', {
      params: {
        customerId
      },
      headers: {
        Authorization:localStorage.getItem('auth')
    }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get customer by username
export const getCustomerByUsername = async (username) => {
  try {
    let response = await axios.get('http://localhost:8081/insuranceapp/getCustomerByUsername', {
      params: {
        username
      },
      headers: {
        Authorization:localStorage.getItem('auth')
    }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get accounts associated with a username
export const getAccounts = async (pageNumber, pageSize, username) => {
  try {
    let customer = await getCustomerByUsername(username);
    console.log("Customer:", customer);
    let id = customer.data.id;
    if (!id) {
      throw new Error('Customer ID is not available');
    }
    let response = await axios.get('http://localhost:8081/insuranceapp/getCustomerByUsername', {
      params: {
        pageNumber,
        pageSize,
        username
      },
      // params: {
      //   username 
      // },
      headers: {
       
        Authorization:localStorage.getItem('auth')
    }
    });
    return response;
  } catch (error) {
    console.error('Failed to get accounts:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const registerCustomer = async (data) => {
  try {
    const response = await axios.post('http://localhost:8081/insuranceapp/register', data, {
      headers: {
        Authorization:localStorage.getItem('auth')
    }
    });
    console.log('Customer registration response:', response);
    return response;
  } catch (error) {
    console.error('Error during customer registration:', error);
    throw error;
  }
};
