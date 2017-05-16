import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {signIn} from '../functions/auth';
import {Form} from './style.js';

export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    signIn(this.email.value, this.pw.value);
  }
  render() {
    return (
      <div>
        <h1>Registrace</h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              ref={(email) => (this.email = email)}
              placeholder="uzivatel@domena.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="heslo007" ref={(pw) => (this.pw = pw)}
            />
          </div>
          <div className="form-button">
            <button
              type="submit"
              className="btn btn-default">
              Odeslat
            </button>
            <div style={{marginTop: 10}}>
              Pokud jste již zaregistrováni, přihlašte se. Registrace slouží pro možnost pozdější editace vámi zadaných cest.
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
