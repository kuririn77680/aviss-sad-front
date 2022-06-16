import React from 'react';
import { BrowserRouter, Link, Route, Routes  } from 'react-router-dom';
import './SideMenu.css';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Sites from '../Sites/Sites';

class SideMenu extends React.Component {
  state = {
    active_page: ""
  };

  appSelect = event => {
    const active_page = event.currentTarget.value;
    this.setState({active_page: active_page});
  };

  render() {
    return (
      <div className="sidenav">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/sites" element={<Sites/>}/>
            <Route path="/preferences" element={<Preferences/>}/>
          </Routes>
        </BrowserRouter>
          <BrowserRouter>
            <Link to="/sites" onClick={() => this.appSelect('Sites')}>Sites</Link>
            <Link to="/dashboard" onClick={() => this.appSelect('Dashboard')}>APP 2</Link>
            <Link to="/preferences" onClick={() => this.appSelect('Preferences')}>APP 3</Link>
            <Link to="/preferences" onClick={() => this.appSelect('Preferences')}>APP 4</Link>
          </BrowserRouter>
      </div>
    )
  }
}

export default SideMenu;
