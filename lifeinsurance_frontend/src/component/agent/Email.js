import axios from 'axios';
import {useState } from "react";

const Email = () => {
  
  const [receiverEmail, setReceiverEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState(null);

    async function save(event)
    {
        event.preventDefault();
    try
{
    await axios.post("http://localhost:8081/insuranceapp/mail", {
        receiverEmail,
        senderEmail,
        subject,
        body
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
        
          alert("mail sent ......");
          setReceiverEmail("");
          setSenderEmail("");
          setSubject("");
          setBody("");
        
        
        }
        catch (error) {
            console.error('Error sending email:', error.response);
            alert("Failed to send mail. Check the console for details.");
        }
   }
    return (
        <div class="container mt-4" >
        <form>
        <div class="form-group">
            <label>receiverEmail</label>
            <input type="text" class="form-control" placeholder="to"
             value={receiverEmail}
            onChange={(event) =>
              {
                setReceiverEmail(event.target.value);      
              }}
            />
        </div>

        <div class="form-group">
            <label>senderEmail</label>
            <input type="text" class="form-control" placeholder="From"
             value={senderEmail}
             onChange={(event) =>
               {
                 setSenderEmail(event.target.value);      
               }}
            />
        </div>

        <div class="form-group">
            <label>subject</label>
            <input type="text" class="form-control" placeholder="subject"
            value={subject}
            onChange={(event) =>
              {
                setSubject(event.target.value);      
              }}
           />
        </div>

         <div class="form-group">
            <label>body</label>
            <input type="text" class="form-control" placeholder="body"
            value={body}
            onChange={(event) =>
              {
                setBody(event.target.value);      
              }}
           />
        </div>
        
        <button class="btn btn-primary mt-4"  onClick={save}>send</button>
        </form>

      </div>
    );
  }
  
  




// import React, { useState } from 'react';
// import axios from 'axios';

// const Email = () => {
//   // Step 1: Initialize state for form data and messages
//   const [receiverEmail, setReceiverEmail] = useState('');
//   const [senderEmail, setSenderEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [body, setBody] = useState('');
//   const [message, setMessage] = useState(null);

//   // Step 2: Event handler for input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
   
    
//   };

 
//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     if (!receiverEmail || !senderEmail || !subject || !body) {
//       setMessage({
//         type: 'error',
//         text: 'Please fill in all fields',
//       });
//       return;
//     }

//     try {
    
//       const response = await axios.post('http://localhost:8081/insuranceapp/mail', {
//         receiverEmail,
//         senderEmail,
//         subject,
//         body,
//       });
      
     
//       if (response.status === 200) {
//         setMessage({
//           type: 'success',
//           text: 'Email sent successfully!',
//         });
      
//         setReceiverEmail('');
//         setSenderEmail('');
//         setSubject('');
//         setBody('');
//       } else {
//         setMessage({
//           type: 'error',
//           text: 'Failed to send email. Please try again.',
//         });
//       }
//     } catch (error) {
//       // Step 9: Handle errors and set error message
//       console.error('Error sending email:', error);
//       setMessage({
//         type: 'error',
//         text: 'Failed to send email. Please try again.',
//       });
//     }
//   };

//   // Step 10: Event handler for closing the message
//   const handleClose = () => {
//     setMessage(null);
//   };

//   // Step 11: Render the component
//   return (
//     <div>
//       <h2>Email Form</h2>
//       {message && (
//         <div style={{ color: message.type === 'success' ? 'green' : 'red' }}>
//           {message.text}
//           <button onClick={handleClose}>Close</button>
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <label>
//           To:
//           <input type="text" name="receiverEmail" value={receiverEmail} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           From:
//           <input type="text" name="senderEmail" value={senderEmail} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Subject:
//           <input type="text" name="subject" value={subject} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Body:
//           <textarea name="body" value={body} onChange={handleChange}></textarea>
//         </label>
//         <br />
//         <button type="submit">Send Email</button>
//       </form>
//     </div>
//   );
// };

export default Email;
