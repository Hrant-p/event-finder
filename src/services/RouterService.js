import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/container/Footer/Footer';
import SignUp from '../components/SignUp/SignUp';
import Login from '../components/Login/Login';
import Dashboard from '../components/container/Dashboard/Dashboard';
import Navbar from '../components/container/Navbar/Navbar';

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
}

export default RouterService;