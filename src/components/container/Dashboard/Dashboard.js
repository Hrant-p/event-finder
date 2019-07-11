import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import Search from '../Search/Search';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Search />
                <GoogleMap/>
            </div>
        )
    }
};

export default Dashboard