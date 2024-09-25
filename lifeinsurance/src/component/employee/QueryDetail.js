import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQueryById } from '../../services/queryService/queryService';

const QueryDetail = () => {
    const { id } = useParams();
    const [query, setQuery] = useState(null);

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const data = await getQueryById(id);
                setQuery(data);
            } catch (error) {
                console.error('Error fetching query:', error);
            }
        };
        fetchQuery();
    }, [id]);

    if (!query) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>Query Details</h2>
            <div className="card p-5">
                <div className="card-body">
                    <h5 className="card-title">{query.title}</h5>
                    <p className="card-text"><strong>Message:</strong> {query.message}</p>
                    <p className="card-text"><strong>Response:</strong> {query.response}</p>
                    <p className="card-text"><strong>Resolved:</strong> {query.isResolved ? 'Yes' : 'No'}</p>
                    <Link to={`/update-query/${query.queryId}`} className="btn btn-warning">Edit</Link>
                    <Link to="/query" className="btn btn-primary ms-2">Back to List</Link>
                </div>
            </div>
        </div>
    );
};

export default QueryDetail;
