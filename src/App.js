import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import RouterService from "./services/RouterService"

function App() {
  
    return (
      <BrowserRouter>
        {/* <Route path="/home" component={Home} exact /> */}
        <Route component={RouterService} />
      </BrowserRouter>
    );
}

export default App
