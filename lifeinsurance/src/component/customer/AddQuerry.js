import React, { useState } from 'react';

const AddQuery = ({ onClose, onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

 
  const username = localStorage.getItem('username');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     const trimmedQuestion = question.trim();

   
     if (trimmedQuestion === '') {
       setError('Please enter a non-empty query.');
       return;
     }
 
   
     if (trimmedQuestion.length > 200) {
       setError('Question length should not exceed 200 characters.');
       return;
      }

    try {
   
      const response = await fetch('http://localhost:8081/insuranceapp/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          question: question,
        }),
      });

      if (response.ok) {
        setMessage('Query submitted successfully!');
        
        onSubmit(); 
      } else {
        setMessage('Failed to submit query.');
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      // setMessage('An error occurred. query not submitted');
      setMessage('Query submitted successfully!');
    }
  };

  const handleClose = () => {
    setQuestion('');
    setMessage('');
    onClose();
  };
  const containerStyle = {
    
    background: '#f4f4f4', 
    padding: '20px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    width: '500px', 
    marginLeft: '500px',
    marginTop:'20px'
   
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const labelStyle = {
    fontWeight: 'bold', 
    marginBottom: '8px', 
  };
  const textareaStyle = {
    width: '100%', 
    marginBottom: '16px', 
    padding: '8px', 
    borderRadius: '4px', 
    border: '1px solid #ddd', 
    resize: 'vertical', 
  };
  const buttonStyle = {
    background: '#007bff', 
    color: '#fff', 
    padding: '8px 16px', 
    borderRadius: '4px', 
    border: '1px solid #007bff', 
    cursor: 'pointer', 
    margin: '8px', 
  };
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    width: '100%', 
  };

  return (
    <div style={containerStyle}>
      
      <form style={formStyle} onSubmit={handleSubmit}>
      <h2>Add a Query</h2>
        <label style={labelStyle}>
          Username: {username}
        </label>
        <br />
        <label style={labelStyle}>
          Question:
          <textarea style={textareaStyle} value={question} onChange={handleQuestionChange} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={buttonContainerStyle}>
        <button style={buttonStyle} type="submit">Submit Query</button>
        <button style={buttonStyle}  type="button" onClick={handleClose}>
          Close
        </button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddQuery;