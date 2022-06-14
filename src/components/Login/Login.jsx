import React from 'react';
import PropTypes from 'prop-types';
import './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  loginUser(credentials){
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data=>data.json())
  }

  handleSubmit(event) {
    const {username, password} = this.state;
    const token = this.loginUser({
      username,
      password
    });
    this.setState({
      'token': token
    });
  }

  render() {
    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Username</p>
            <input
              name="username"
              type="text"
              onChange={this.handleChange}
              placeholder="E-mail"/>
          </label>
          <label>
            <p>Password</p>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              placeholder="Password"/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login
