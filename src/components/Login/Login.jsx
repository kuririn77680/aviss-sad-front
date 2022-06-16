import React, { useRef, useState, useEffect, useContext } from 'react';

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
    )
}

export default Login
