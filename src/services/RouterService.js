import React, {Fragment, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import SignUp from '../container/SignUp/SignUp';
import Login from '../container/Login/Login';
import Dashboard from '../container/Dashboard/Dashboard';
import Navbar from '../components/Navbar/Navbar';
import PrivateRoute from './PrivateRoute';
import {app} from "../API/firebase";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setCurrentUser} from "../store/actions/userActionCreator";

function RouterService({ setCurrentUserAction }) {

    useEffect(() => {
        app.auth().onAuthStateChanged(user => setCurrentUserAction(user));
    }, []);


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

const mapDispatchToProps = dispatch =>
    bindActionCreators({
    setCurrentUserAction: setCurrentUser
}, dispatch);

export default connect(null, mapDispatchToProps)(RouterService);
