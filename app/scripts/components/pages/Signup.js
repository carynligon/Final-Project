import React from 'react';
import {Link, hashHistory} from 'react-router';

import store from '../../store';

import UserModal from '../UserModal';

export default React.createClass({
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    store.session.signup(firstName, lastName, username, password, email);
    this.props.hideModal();
  },
  render() {
    return(
      <UserModal hideModal={this.props.hideModal}>
        <form className="login-signup-form" onSubmit={this.signup}>
          <h2 className="signup-title">SIGN UP</h2>
          <input type="text" placeholder="first name" id="firstName" ref="firstName"/>
          <input type="text" placeholder="last name" id="lastName" ref="lastName"/>
          <input type="email" placeholder="email" id="email" ref="email"/>
          <input type="text" placeholder="username" id="username" ref="username"/>
          <input type="password" placeholder="password" id="password" ref="password"/>
          <input type="password" placeholder="confirm password" id="confirm-password" ref="confirmPassword"/>
          <button type="submit" id="submit-login-btn">submit</button>
          <p>Already have an account?<span id="signup-btn" onClick={this.props.showLogin}>Sign in!</span></p>
        </form>
      </UserModal>
    );
  }
});
