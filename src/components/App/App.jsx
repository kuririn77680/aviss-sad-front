import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SideMenu from '../SideMenu/SideMenu';

class App extends React.Component {
  state = {
    running_app: ""
  }

  handleApp = event => {

  }

  render() {
    return (
      <div className="wrapper">
        <SideMenu />
        <div className="content">
        </div>
      </div>
    )
  }
}

export default App;
