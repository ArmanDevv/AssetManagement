import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/ChangePassword',
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div style={styles.container}>
      {/* <h2 style={styles.heading}>Update Password</h2> */}
      <form onSubmit={handleUpdatePassword} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" className='btn'>Update Password</button>
      </form>
      {message && 
      <>
      <p style={styles.message}>{message}</p>
      <button className='btn' onClick={()=>{navigate('/Dashboard')}} style={{marginTop:'20px'}}> Go back to Home Page </button>
      </>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // maxHeight: '190px',
    // backgroundColor: '#f0f2f5',
    padding: '10px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  inputGroup: {
    marginBottom: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '20px',
    color: '#ff0000',
    fontWeight: '500',
  },
};

export default UpdatePassword;
