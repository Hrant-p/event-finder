import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import SignUp from '../container/SignUp/SignUp';
import Login from '../container/Login/Login';
import Dashboard from '../container/Dashboard/Dashboard';
import Navbar from '../components/Navbar/Navbar';
import PrivateRoute from './PrivateRoute';

function RouterService() {

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/registration" component={SignUp} exact />
        <Route path="/(login||)/" component={Login} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default RouterService;
