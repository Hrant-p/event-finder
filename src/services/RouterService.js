import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import SignUp from '../container/SignUp/SignUp';
import Login from '../container/Login/Login';
import Dashboard from '../container/Dashboard/Dashboard';
import Navbar from '../components/Navbar/Navbar';

function RouterService() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/registration" component={SignUp} exact />
        <Route path="/(login||)/" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} exact />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default RouterService;