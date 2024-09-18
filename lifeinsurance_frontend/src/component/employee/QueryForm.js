import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQueryById, createQuery, updateQuery } from '../../services/queryService/queryService';

const QueryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState({
        title: '',
        message: '',
        response: '',
        isResolved: false
    });

    useEffect(() => {
        if (id) {
            const fetchQuery = async () => {
                try {
                    const data = await getQueryById(id);
                    setQuery(data);
                } catch (error) {
                    console.error('Error fetching query:', error);
                }
            };
            fetchQuery();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setQuery({
            ...query,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateQuery(id, query);
            } else {
                await createQuery(query);
            }
            navigate('/query');
        } catch (error) {
            console.error('Error saving query:', error);
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Update Query' : 'Create Query'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={query.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="3"
                        value={query.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="response" className="form-label">Response</label>
                    <textarea
                        className="form-control"
                        id="response"
                        name="response"
                        rows="3"
                        value={query.response}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isResolved"
                        name="isResolved"
                        checked={query.isResolved}
                        onChange={handleChange}
                    />
                    <label htmlFor="isResolved" className="form-check-label">Is Resolved</label>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default QueryForm;
