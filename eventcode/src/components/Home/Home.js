import React, { useEffect, useRef, useState } from 'react';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import './Home.css';


const Home = () => {

  const [uniqueCode, setUniqueCode] = useState('');
  const [errMsg,setErrMsg]=useState('');

  const navigate = useNavigate();
  const currentToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const errRef=useRef();
  
  const GETCODE_URL=`/home/${userId}/unique-code`;

  
  const generateUniqueCode =async (e) => {
    e.preventDefault();
    //console.log(`Bearer ${currentToken}`)
        
        try {
          const response = await axios.get(GETCODE_URL, {
              headers: {
                  'Authorization': `Bearer ${currentToken}`
              }
          });
          setUniqueCode(response.data);
          setErrMsg('')
          console.log(response.data);
          
      } catch(err){
            if(!err?.response){
                setErrMsg('No Server Response');
                console.log(err)
            }else if(err.response?.status===409){
                setErrMsg('Username taken');
            }else{
                setErrMsg('Registration failed')
                console.log(err)
            }
            //errRef.current.focus();

        }
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
      {uniqueCode && <div>Unique Code: {uniqueCode}</div>}
            {errMsg && <div>Error: {errMsg}</div>}
    </div>
  );
};

export default Home;
