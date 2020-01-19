import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RouterService from "./services/RouterService"

function App() {
    return (
      <BrowserRouter>
        <Route component={RouterService} />
      </BrowserRouter>
    );
};

export default App

