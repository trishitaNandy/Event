import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';
import './LoginSignup.css';
import axios from "../../api/axios";

const USER_REGEX = /^(?:[a-zA-Z][a-zA-z0-9-_]{3,23}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX=/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[a-zA-Z]{4,}$/;
const REGISTER_URL='/auth/create-user'    //backend url for register

const Register = () => {
    const userRef=useRef();
    const errRef=useRef();

    const [user,setUser]=useState('');
    const [validUser,setValidUser]=useState(false);
    const [userFocus,setUserFocus]=useState(false);

    const [name,setName]=useState('');
    const [validName,setValidName]=useState(false);
    const [nameFocus,setNameFocus]=useState(false);

    const [pwd,setPwd]=useState('');
    const [validPwd,setValidPwd]=useState(false);
    const [pwdFocus,setPwdFocus]=useState(false);

    const [matchPwd,setMatchPwd]=useState('');
    const [validMatch,setValidMatch]=useState(false);
    const [matchFocus,setMatchFocus]=useState(false);

    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        const result=USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidUser(result);
    },[user])

    useEffect(()=>{
        const result=NAME_REGEX.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    },[name])

    useEffect(()=>{
        const result=PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match=pwd===matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        // if button enabled with JS hack
        //const v1 = USER_REGEX.test(user);
        //const v2 = PWD_REGEX.test(pwd);
        if (!validUser || !validPwd) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response=await axios.post(REGISTER_URL,
                JSON.stringify({name:name, email: user,password: pwd }),
                {
                    headers: {'Content-Type':'application/json'},
                    withCredentials: true,
                }
                
            );
            console.log(response.data);
            console.log(response.token);
            //console.log(response.refresh);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear input field
        } catch(err){
            if(!err?.response){
                setErrMsg('No Server Response');
            }else if(err.response?.status===409){
                setErrMsg('Username taken');
            }else{
                setErrMsg('Registration failed')
                console.log(err)
            }
            errRef.current.focus();

        }
        //console.log(user,pwd);
    }

  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <form className='container' onSubmit={handleSubmit}>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className='input'>
                    <label htmlFor="name">
                        <img src={user_icon} alt=""/>
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validName || !name? "hide": "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        placeholder='Name' 
                    />
                    <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Minimum 4 letters required<br />
                        Numbers, special characters not allowed.
                    </p>
                </div>
                <div className='input'>
                    <label htmlFor="username">
                        <img src={email_icon} alt=""/>
                        <span className={validUser ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validUser || !user? "hide": "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        placeholder='Email Id' 
                        
                    />
                    <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>

                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must be an email address.<br />
                        Letters, numbers, special characters allowed.
                    </p>
                </div>
                <div className='input'>
                    <label htmlFor="password">
                        <img src={password_icon} alt=""/>
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder='Password'    
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className='input'>
                    <label htmlFor="confirm_pwd">
                        <img src={password_icon} alt=""/>
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input 
                        type="password" 
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        placeholder='Confirm Password'    
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                </div>
            </div>

            <div className='submit-container'>
                <button disabled={!validUser || !validPwd || !validMatch ? true : false} type='submit' className='submit'>Sign up</button>
            </div>

            <p className="line">
                Already registered?<br />
                <span >
                    {/*Router link here*/}
                    <a href="/login">Sign In</a>
                </span>
            </p>
        </form>
        
    </section>

  )
}

export default Register