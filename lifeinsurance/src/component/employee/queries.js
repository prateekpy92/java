import React, { useState, useEffect } from 'react';
import { getAllQueries } from '../../services/queryService/queryService';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // list, form, details
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      const data = await getAllQueries();
      setQueries(data);
    };
    fetchQueries();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'details') {
      setSelectedQuery(null); // Reset selected query when leaving details view
    }
  };

  const handleViewDetails = (query) => {
    setSelectedQuery(query);
    setActiveTab('details');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Query Management</h1>
      
      <div className="btn-group mb-4">
        <button
          onClick={() => handleTabChange('list')}
          className={`btn btn-primary ${activeTab === 'list' ? 'active' : ''}`}
        >
          Query List
        </button>
        <button
          onClick={() => handleTabChange('form')}
          className={`btn btn-primary ${activeTab === 'form' ? 'active' : ''}`}
        >
          Create Query
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'list' && (
          <div className="list-group">
            <h2 className="mb-3">Queries</h2>
            {queries.length > 0 ? (
              queries.map((query) => (
                <div key={query.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{query.title}</span>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewDetails(query)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted">No queries available</p>
            )}
          </div>
        )}

        {activeTab === 'form' && (
          <div className="card p-4">
            <h2 className="mb-4">Create New Query</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}

        {activeTab === 'details' && selectedQuery && (
          <div className="card p-4">
            <h2 className="mb-4">Query Details</h2>
            <p><strong>Title:</strong> {selectedQuery.title}</p>
            <p><strong>Description:</strong> {selectedQuery.description}</p>
            <button className="btn btn-secondary" onClick={() => handleTabChange('list')}>Back to List</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Queries;
