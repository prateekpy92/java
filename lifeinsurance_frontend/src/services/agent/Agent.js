import axios from "axios";

// Helper function to get the token with "Bearer " prefix

export const EditAgentService = async (data) => {
    try {
        console.log("Sending request to EditAgentService with data:", data);
        const response = await axios.put('http://localhost:8081/insuranceapp/editAgent', data, {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        });
        return response;
    } catch (error) {
        console.error("Error editing agent:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const AgentByUsername = async (username) => {
    try {
        console.log("Fetching agent by username:", username);
        const response = await axios.get('http://localhost:8081/insuranceapp/getAgentDetails', {
            params: { username },
            headers: {
                Authorization: localStorage.getItem('auth')
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching agent data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const GetAllAgent = async (pageNumber = 0, pageSize = 10) => {
    try {
        const response = await axios.get('http://localhost:8081/insuranceapp/allAgents', {
            params: { pageNumber, pageSize },
            headers: {
                Authorization: localStorage.getItem('auth')
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching all agents:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const SaveAgent = async (
    firstName,
    lastName,
    dateOfBirth,
    username,
    password,
    mobileNumber,
    email,
    houseNo,
    apartment,
    city,
    pincode,
    state
) => {
    try {
        console.log("Token value:", localStorage.getItem('auth'));
        console.log("Saving agent with data:", {
            firstName,
            lastName,
            dateOfBirth,
            username,
            password,
            mobileNumber,
            email,
            houseNo,
            apartment,
            city,
            pincode,
            state
        });

        const response = await axios.post('http://localhost:8081/insuranceapp/addagent', {
            firstName,
            lastName,
            dateOfBirth,
            mobileNumber,
            email,
            username,
            password,
            houseNo,
            apartment,
            city,
            pincode,
            state
        }, {
            headers: {
                Authorization: localStorage.getItem('auth')
            },
        });
        console.log("Save agent response:", response);
        return response;
    } catch (error) {
        console.error("Error saving agent:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const DeleteAgentService = async (id) => {
    try {
        console.log("Deleting agent with ID:", id);
        const response = await axios.delete('http://localhost:8081/insuranceapp/agent', {
            params: { id },
            headers: {
                Authorization: localStorage.getItem('auth')
            },
        });
        return response;
    } catch (error) {
        console.error("Error deleting agent:", error.response ? error.response.data : error.message);
        throw error;
    }
};
export const getAgentDetail = async () => {
    try {
        const response = await axios.get('http://localhost:8081/insuranceapp/getAgentDetails', {
            params: { username: localStorage.getItem('username') },
            headers: {
                Authorization: localStorage.getItem('auth')
            },
        });
        
      
        if (response.data && response.data.id) {
            localStorage.setItem('agentId', response.data.id);
        }
        
        return response;
    } catch (error) {
        console.error("Error fetching agent details:", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const agentClaim = async (data) => {
    try {
        const response = await axios.post('http://localhost:8081/insuranceapp/claim', data, {
            headers: {
                Authorization: localStorage.getItem('auth')
            },
        });
        return response;
    } catch (error) {
        console.error("Error submitting agent claim:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAgentPolicies = async (pageNumber, pageSize) => {
    try {
        // Retrieve agentId from localStorage
        let agentId = localStorage.getItem('agentId');
        console.log("Agent ID from localStorage:", agentId);

        // If agentId is not found, fetch the agent details and store the agentId
        if (!agentId) {
            console.log("Agent ID not found in localStorage, fetching agent details...");
            const agentDetails = await getAgentDetail();
            agentId = agentDetails.data.id; // Use the ID from fetched details

            if (!agentId) {
                throw new Error("Agent ID could not be retrieved from agent details.");
            }
            
            // Store the agentId in localStorage
            localStorage.setItem('agentId', agentId);
        }

        // Ensure the auth token is available
        const authToken = localStorage.getItem('auth');
        if (!authToken) {
            throw new Error("Authorization token is missing. Please log in again.");
        }

        // Use the agentId to get policies
        const response = await axios.get(`http://localhost:8081/insuranceapp/customers-by-agent`, {
            params: { pageNumber, pageSize },
            headers: {
                Authorization: authToken
            },
        });

        return response;
    } catch (error) {
        console.error("Error fetching agent policies:", error.response ? error.response.data : error.message);
        throw error;
    }
};
