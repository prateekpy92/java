import React, { useState, useEffect } from 'react';
import { getAllQueries } from '../../services/queryService/queryService';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getAllQueries();
        setQueries(data);
      } catch (err) {
        setError('Failed to fetch queries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Queries List</h1>
      <ul>
        {queries.length > 0 ? (
          queries.map(query => (
            <li key={query.id}>
              <h2>{query.title}</h2>
              <p>{query.description}</p>
            </li>
          ))
        ) : (
          <p>No queries available</p>
        )}
      </ul>
    </div>
  );
};

export default QueryList;
