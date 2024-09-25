import axios from 'axios';
import { useState } from "react";

const Email = () => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState(null);

  async function save(event) {
    event.preventDefault();
    try {
      if (!receiverEmail || !senderEmail || !subject || !body) {
        alert("Please fill in all fields.");
        return;
      }

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

      alert("Mail sent ......");
      setReceiverEmail("");
      setSenderEmail("");
      setSubject("");
      setBody("");

    } catch (error) {
      console.error('Error sending email:', error.response);
      alert("Failed to send mail. Check the console for details.");
    }
  }

  return (
    <div className="container mt-4">
      <form>
        <div className="form-group">
          <label>Receiver Email</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="To"
            value={receiverEmail}
            onChange={(event) => setReceiverEmail(event.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Sender Email</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="From"
            value={senderEmail}
            onChange={(event) => setSenderEmail(event.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Body</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Body"
            value={body}
            onChange={(event) => setBody(event.target.value)} 
          />
        </div>
        
        <button className="btn btn-primary mt-4" onClick={save}>Send</button>
      </form>
    </div>
  );
}

export default Email;
