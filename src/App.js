import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RouterService from './services/RouterService';
import { watchForAuth } from './store/actions/userActionCreator';

function App({ watchCurrentUserAction }) {
  useEffect(() => {
    watchCurrentUserAction();
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
