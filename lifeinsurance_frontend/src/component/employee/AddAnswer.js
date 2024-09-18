
import React, { useState, useEffect } from 'react';

const AddAnswer = () => {
 
  const [questionId, setQuestionId] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [formVisible, setFormVisible] = useState(true); 

  

  
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        
        const response = await fetch(`http://localhost:8081/insuranceapp/question/${questionId}`);
        if (response.ok) {
          const questionData = await response.json();
          setAnswer(questionData.answer); 
        } else {
          console.error('Failed to fetch question details');
        }
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };

    if (questionId) {
      fetchQuestionDetails();
    }
  }, [questionId]);

 
  const handleQuestionIdChange = (e) => {
    setQuestionId(e.target.value);
    setAnswer(''); 
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
        },
        body: JSON.stringify({
          answer: answer,
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
    width :'100px'
  };
  
  return (
    <div className='container' style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add an Answer</h2>
        <label>
          Question ID:
          <input type="text" value={questionId} onChange={handleQuestionIdChange} />
        </label>
        <br />
        <label>
          Answer  :
          <input type="text"value={answer} onChange={handleAnswerChange} />
        </label>
        <br />
        <div>
        <button type="submit"
        class="btn btn-primary btn btn-sm rounded-pill border border-warning" style={buttonStyle}
        >Submit</button>
        <button type="button" 
        class="btn  btn btn-sm rounded-pill border border-warning" 
        style={buttonStyle} onClick={() => setFormVisible(false)}
        >Close</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};


export default AddAnswer;
