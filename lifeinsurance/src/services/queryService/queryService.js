import axios from 'axios';

const API_URL = 'http://localhost:8081/insuranceapp'; // Ensure this is correct

// Fetch all queries with pagination
export const getAllQueries = async (pageNumber = 0, pageSize = 10) => {
    try {
        const response = await axios.get(`${API_URL}/queries`, { // Updated URL to match your controller's path
            params: { 
                pageNumber: Number(pageNumber),  
                pageSize: Number(pageSize)
            },
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching queries:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch a single query by ID
export const getQueryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/queries/${id}`); // Updated URL to match your controller's path
        return response.data;
    } catch (error) {
        console.error('Error fetching query:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Create a new query
export const createQuery = async (query) => {
    try {
        const response = await axios.post(`${API_URL}/queries`, query, { // Updated URL to match your controller's path
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating query:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing query by ID
export const updateQuery = async (id, query) => {
    try {
        const response = await axios.put(`${API_URL}/queries/${id}`, query, { // Updated URL to match your controller's path
            headers: {
                Authorization:localStorage.getItem('auth')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating query:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a query by ID
export const deleteQuery = async (id) => {
    try {
        await axios.delete(`${API_URL}/queries/${id}`, { // Updated URL to match your controller's path
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth')}` // Added `Bearer` keyword if that's the token type
            }
        });
    } catch (error) {
        console.error('Error deleting query:', error.response ? error.response.data : error.message);
        throw error;
    }
};
