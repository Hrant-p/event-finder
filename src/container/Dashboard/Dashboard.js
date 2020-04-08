import React from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';
import Search from '../Search/Search';
import './Dashboard.scss';

const Dashboard = () => (
  <div className="dashboard">
    <Search />
    <GoogleMap />
  </div>
);

export default Dashboard;
