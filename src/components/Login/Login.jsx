// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './Login.css';
//
// async function loginUser(credentials) {
//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }
//
// export default function Login({ setToken }) {
//   const [username, setUserName] = useState();
//   const [password, setPassword] = useState();
//
//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = await loginUser({
//       username,
//       password
//     });
//     setToken(token);
//   }
//
//   return(
//     <div className="login-wrapper">
//       <h1>Please Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <p>Username</p>
//           <input type="text" onChange={e => setUserName(e.target.value)} />
//         </label>
//         <label>
//           <p>Password</p>
//           <input type="password" onChange={e => setPassword(e.target.value)} />
//         </label>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }
//
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

import axios from '../../api/axios';
const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(LOGIN_URL);
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({user, password}),
        {
           headers: {'Content-Type': 'application/json'},
           withCredentials: true
         }
      );
      // console.log(JSON.stringify(response?.data));
      console.log('test');
      console.log(JSON.stringify(response));
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;
      setAuth({ user, password, roles, accessToken });
      setUser('');
      setPassword('');
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" :
          "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
          </form>
        </section>
      )}
      </>
    )
}

export default Login
