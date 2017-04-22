import React, {Component} from 'react';
import {login} from '../functions/auth';
import {Link} from 'react-router';
import {Form} from './style.js';

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    login(this.email.value, this.pw.value);
  }
  render() {
    return (
      <div>
        <h1> Přihlášení </h1>
        <Form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              ref={(email) => (this.email = email)}
            />
          </div>
          <div className="form-group">
            <label>Heslo</label>
            <input
              type="password"
              className="form-control"
              ref={(pw) => (this.pw = pw)}
            />
          </div>
          <div className="form-button">
            <button
              type="submit"
              className="btn btn-default">
              Přihlásit
            </button>
            <div style={{marginTop: 10}}>
              Pokud jste tu poprvé, zaregistrujte se. Registrace slouží pro možnost pozdější editace vámi zadaných cest.
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
