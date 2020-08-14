import React from 'react';
import './App.css';

import {openDevTool} from './service'

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
      >
        HELLO ELECTRON

        <button onClick={_ => openDevTool()}>
          openDevTool
        </button>
      </header>
    </div>
  );
}

export default App;
