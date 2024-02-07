import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './Home.css';


const Home = () => {

  const navigate=useNavigate();

  const [uniqueCode, setUniqueCode] = useState('');

  const generateUniqueId = () => {
    return `ID_${Math.floor(Math.random() * 100000)}`;
  };

  

  const generateUniqueCode = () => {
    const newUniqueId = generateUniqueId();
    setUniqueCode(newUniqueId);
  };

  const createEvent = () => {
    //console.log("Event created")
    navigate("/create-event")
  };

  return (
    <div className='home'>
      <div>
        Welcome
      </div>
      <div className='generate'>
        <button className='button' onClick={createEvent}>
            Create Event
          </button>
        <button className='button' onClick={generateUniqueCode}>
          Generate Unique code
        </button>
        
          
        
      </div>
      {uniqueCode && (
        <div className='unique-code'>
          Unique Code: {uniqueCode}
        </div>
      )}
    </div>
  );
};

export default Home;
