import React, { Component } from 'react';
import axios from 'axios';
import { eventAPI } from '../../../API/API';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = { 
            query: '',
            loading: false,
            error: null,
            events: [],
            page: 1
        };
    };

    handleSubmit = (text, page, e) => {
        if(e) e.preventDefault();

        this.setState({ loading: true })
        
        const { PRIVATE_API_KEY } = eventAPI;

        axios
          .get(
            `https://www.eventbriteapi.com/v3/events/search/?q=${text}&token=${PRIVATE_API_KEY}&expand=venue&page=${page}`
          )
          .then(res => res.data)
          .then(data =>
            data.events.map(event => ({
              name: event.name.text,
              id: event.id,
              location: {
                lat: event.venue.latitude,
                lng: event.venue.longitude
              }
            }))
          )
          .then(eventArr => this.setState({ events: eventArr }))
          .catch(e => console.log(e));                
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    render() {
        console.log(this.state);
        const { query, page } = this.state;

        return (
          <div>
            <h2>Find Your Events</h2>
            <form onSubmit={e => this.handleSubmit(query, page, e)}>
              <input
                type="search"
                placeholder="Type the events to search"
                name="query"
                value={this.state.query}
                onChange={this.handleChange}
              />
              <button
                type="button"
                onClick={() => this.handleSubmit(query, page)}
              >
                Search
              </button>
            </form>
          </div>
        );
    }
};

export default Search; 