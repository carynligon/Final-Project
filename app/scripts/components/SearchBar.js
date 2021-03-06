import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';
import settings from '../settings';

import DrinkPreview from './DrinkPreview';

export default React.createClass({
  getInitialState() {
    return {hide: true};
  },
  routeToRecipe(e) {
    if (e.target.parentElement.id !== 'results-dropdown') {
      hashHistory.push(`/recipe/${e.target.parentElement.id}`);
    }
  },
  submittedForm(e) {
    e.preventDefault();
    if (this.props.submit) {
      this.performSearch();
    }
  },
  performSearch(e) {
    this.props.hideFilter();
    let searchString = this.refs.searchQuery.value;
    if (e) {
      e.preventDefault();
      if (e.which === 13) {
        this.setState({hide: true});
        this.toSearchResults();
      } else {
        if (searchString.length >= 3 && this.state.windowWidth === 'big') {
          this.setState({hide: false});
          store.searchResults.getResults(searchString);
        }
      }
    } else {
      this.setState({hide: true});
      this.toSearchResults();
    }
  },
  toSearchResults() {
    hashHistory.push({
      pathname: 'search',
      query: {q: this.refs.searchQuery.value.toLowerCase()}
    })
    this.setState({hide: true});
  },
  listener() {
    this.setState({results: store.searchResults.toJSON()})
  },
  listenToClicks(e) {
    if (e.target.id !== 'results-dropdown' && e.target.id !== 'search-input') {
      if (!this.state.hide) {
        this.setState({hide: true});
      }
    }
  },
  componentDidMount() {
    store.searchResults.on('update', this.listener);
    window.addEventListener('click', this.listenToClicks);
  },
  componentWillUnmount() {
    store.searchResults.off('update', this.listener);
    window.removeEventListener('click', this.listenToClicks);
  },
  render() {
    let styles;
    let reduced;
    let results;
    if (this.state.hide) {
      styles = {
        height: '0px'
      };
    } else {
      styles = {
        height: '200px'
      };
    }
    if (this.state.results && !this.props.submit) {
      if (this.state.results.length >= 1) {
      reduced = this.state.results.reduce((rtsf, curr) => {
        if (_.has(rtsf, curr.drinkName)) {
          return rtsf;
        } else {
          rtsf[curr.drinkName] = curr;
          return rtsf;
        }
      },{});
        results = _.toArray(reduced).map((drink, i) => {
          return (
            <li key={i} onClick={this.routeToRecipe} id={drink.drink._obj._id}>
              <h6>{drink.drink._obj.drink__strDrink}</h6>
            </li>
          );
        });
      }
    }
    let searchIcon;
    if (this.props.submit) {
      searchIcon = (<i className="fa fa-search" id="search-icon-btn" aria-hidden="true" onClick={this.submittedForm}></i>);
    }
    return(
      <form id="search-bar-form" autoComplete="off" onSubmit={this.submittedForm}>
        <input type="text" id="search-input" onKeyUp={this.performSearch} placeholder="SEARCH RECIPES..." ref="searchQuery"/>
          <ul id="results-dropdown" style={styles}>
            {results}
          </ul>
          {searchIcon}
      </form>
    );
  }
});
