import React, { Component } from 'react';
import GoogleMap from "../GoogleMap/GoogleMap";
import Search from '../Search/Search';
import './Dashboard.scss';

class Dashboard extends Component {
    render() {
        return (
          <div className="dashboard">
                <Search />
              <GoogleMap />
          </div>
        );
    };
};

export default Dashboard
