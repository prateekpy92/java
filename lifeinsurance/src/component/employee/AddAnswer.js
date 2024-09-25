import React, { useState, useEffect } from 'react';

const AddAnswer = ({ onClose }) => {
  const [questionId, setQuestionId] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      if (!questionId) return;

      try {
        
        const response = await fetch(`http://localhost:8081/insuranceapp/question/${questionId}`,{
        
          headers:
          {
              Authorization:localStorage.getItem('auth')
          },
      })
         
        
        if (response.ok) {
          const questionData = await response.json();
          setAnswer(questionData.answer || ''); // Set existing answer if available
        } else {
          console.error('Failed to fetch question details');
        }
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleQuestionIdChange = (e) => {
    setQuestionId(e.target.value);
    setAnswer(''); // Clear answer when question ID changes
    setMessage(''); // Clear message on question ID change
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8081/insuranceapp/question/${questionId}/answer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           Authorization:localStorage.getItem('auth')
        },
        body: JSON.stringify({ answer:answer,  question: {
          id: questionId }
        }),
      });

      if (response.ok) {
        setMessage('Answer submitted successfully!');
        setFormVisible(false);
      } else {
        setMessage('Failed to submit answer.');
        setFormVisible(false);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setMessage('An error occurred.');
    }
  };

  const containerStyle = {
    background: '#f4f4f4',
    padding: '20px',
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const buttonStyle = {
    background: '#007bff',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #007bff',
    marginRight: '5px',
    cursor: 'pointer',
    width: '100px',
  };

  return (
    <div className='container' style={containerStyle}>
      {formVisible && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2>Add an Answer</h2>
          <label>
            Question ID:
            <input type="text" value={questionId} onChange={handleQuestionIdChange} />
          </label>
          <br />
          <label>
            Answer:
            <input type="text" value={answer} onChange={handleAnswerChange} />
          </label>
          <br />
          <div>
            <button
              type="submit"
              className="btn btn-primary btn-sm rounded-pill border border-warning"
              style={buttonStyle}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-sm rounded-pill border border-warning"
              style={buttonStyle}
              onClick={() => {
                setFormVisible(false);
                if (onClose) onClose(); // Call the onClose function if provided
              }}
            >
              Close
            </button>
          </div>
          <p>{message}</p>
        </form>
      )}
      {!formVisible && (
        <p className='text-center'>Form is closed. You can open it again if needed.</p>
      )}
    </div>
  );
};

export default AddAnswer;
