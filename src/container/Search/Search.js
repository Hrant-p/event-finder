import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoadingEventsSelector, findedEventsSelector } from '../../store/selectors/eventSelector';
import { bindActionCreators } from 'redux';
import { searchEvents } from '../../store/actions/eventActionCreators';
import './Search.scss'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: ""
    };
  };

  handleSubmit = (name, location, e) => {
    if (e) e.preventDefault();
    if (name || location) {
      this.props.eventActionCreator(name, location);
    } else {
        alert('Search fields are empty, write the search fields!');
    };
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, location } = this.state;

    return (
        <div className="search-area">
            <h3>Search Events Around The World</h3>
                <input
                  type="search"
                  placeholder="Type the events name"
                  name="name"
                  value={this.state.query}
                  onChange={this.handleChange}
                    />
                <input
                  type="search"
                  placeholder="Type the events loacations"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
            <button
              type="button"
              onClick={e => this.handleSubmit(name, location, e)}
            >
              Search
            </button>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  isLoading: isLoadingEventsSelector(state),
  findedEvents: findedEventsSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { eventActionCreator: searchEvents },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
