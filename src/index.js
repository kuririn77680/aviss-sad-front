import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import Login from './components/Login/Login'
import useToken from './components/Login/useToken'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        token: "",
    };
  }

  render() {
    const token = this.getToken();
    if(!token) {
      return <Login setToken={this.setToken}/>
    }

    return (
      <div className="wrapper">
        <h1>Application</h1>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
