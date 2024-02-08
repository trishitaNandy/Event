import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import './CreateEvent.css'

//const CREATE_URL="/event/create/{userId}"

const CreateEvent = () => {
    const ProSpan = styled('span')({
        display: 'inline-block',
        height: '1em',
        width: '1em',
        verticalAlign: 'middle',
        marginLeft: '0.3em',
        marginBottom: '0.08em',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
      });
      function Label({ componentName, valueType, isProOnly }) {
        const content = (
          <span>
            <strong>{componentName}</strong> for {valueType} editing
          </span>
        );
        if (isProOnly) {
            return (
              <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                  <a
                    href="https://mui.com/x/introduction/licensing/#pro-plan"
                    aria-label="Included on Pro package"
                  >
                    <ProSpan />
                  </a>
                </Tooltip>
                {content}
              </Stack>
            );
          }
        
          return content;
        }
    //const userRef=useRef();
    const navigate = useNavigate();
    const currentToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');


    const CREATE_URL=`/event/create/${userId}`;
    //console.log(CREATE_URL)


    const errRef=useRef();
    const userRef=useRef();

    const [name,setName]=useState('');
    const [nameFocus,setNameFocus]=useState(false);

    const [date,setDate]=useState('');
    const [dateFocus, setDateFocus]=useState(false);

    const [time,setTime]=useState('');
    const [timeFocus, setTimeFocus]=useState(false);

    const [venue,setVenue]=useState('');
    const [venueFocus, setVenueFocus]=useState(false);

    const [errMsg,setErrMsg]=useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

   
        if (!currentToken) {
            navigate("/login")
            console.error('Token not found in local storage');
        }
    


    const handleSubmit=async(e)=>{
        e.preventDefault();
        //console.log("Event created")
        try{
            const formattedDate = dayjs(date).format('YYYY-MM-DD'); // Format date as 'YYYY-MM-DD'
            const formattedTime = dayjs(time).format('HH:mm:ss');

            console.log("Name:", name);
            console.log("Formatted Date:", formattedDate);
            console.log("Formatted Time:", formattedTime);
            console.log("Venue:", venue);

            const response=await axios.post(CREATE_URL,
                JSON.stringify({name: name,date:formattedDate, timing: formattedTime, venue: venue }),
                {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json'
                      },
                      
                }
                
            );
            
            console.log(response.data);
            
            //clear input field
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
            errRef.current.focus();

        }
    }


  return (

    
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form className='container' onSubmit={handleSubmit}>
            <div className='header'>
                <div className='text'>Create Event</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input1'>
                    <label htmlFor='name'>
                        Event:
                    </label>
                    
                    <input 
                        type="text" 
                        id="name"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        placeholder='Name' 
                    />
                    
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='input2'>
                        <label htmlFor='date'>Date:</label>
                        
                            <DatePicker 
                                id="date"
                                ref={userRef}
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                renderInput={(params) => <input {...params} />}
                            />
                        
                    </div>
                

                    <div className='input2'>
                    
                        <label htmlFor='time'>Time:</label>
                        
                        <TimePicker
                            id="time"
                            ref={userRef}
                            value={time}
                            onChange={(newValue) => setTime(newValue)}
                            renderInput={(params) => <input {...params} />}

                        />
                        
                    
                        
                    </div>
                </LocalizationProvider>
                <div className='input1'>
                    <label htmlFor='venue'>
                        Venue:
                    </label>
                    <input 
                        type="text" 
                        id="venue"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setVenue(e.target.value)}
                        value={venue}
                        required
                        onFocus={() => setVenueFocus(true)}
                        onBlur={() => setVenueFocus(false)}
                        placeholder='Name' 
                    />
                </div>
            </div>
            <div className='submit-container'>
                <button className='submit' type='submit'>Create</button>
            </div>

        </form>
    </section>
  )
}

export default CreateEvent