import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1>Application</h1>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
