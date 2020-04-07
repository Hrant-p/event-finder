import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RouterService from './services/RouterService';
import {bindActionCreators} from "redux";
import {watchForAuth} from "./store/actions/userActionCreator";
import {connect} from "react-redux";

function App({ watchCurrentUserAction }) {

    useEffect(() => {
        watchCurrentUserAction()
    }, []);

  return (
      <BrowserRouter>
        <Route component={RouterService} />
      </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    watchCurrentUserAction: watchForAuth
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
