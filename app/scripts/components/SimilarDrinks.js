import _ from 'underscore';
import React from 'react';
import {Link} from 'react-router';

import store from '../store';

import DrinkPreview from './DrinkPreview';

export default React.createClass({
  render() {
    let similarDrinks;
    let similarDrinkLI;
    if (this.props.similar) {
      similarDrinkLI = this.props.similar.map((drink, i) => {
        return (
           <li key={i}><Link to={`recipe/${drink._id}`}>{drink.drink__strDrink}</Link></li>
        );
      });
    }
    return (
      <ul id="similar-drinks">
        <h4>Similar drinks you might like:</h4>
        {similarDrinkLI}
      </ul>
    );
  }
});
