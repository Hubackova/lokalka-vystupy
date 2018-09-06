import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login} from '../functions/auth';
import {Form, AddButton} from './style.js';
import firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';

export default class Login extends Component {
  state = {emailSent: false}

  handleSubmit = (e) => {
    e.preventDefault();
    login(this.email.value, this.pw.value);
  }

  handleResetPassword = () => {
    const auth = firebase.auth();
    const emailAddress = this.email.value;
    auth.sendPasswordResetEmail(emailAddress).then(() => {
      this.setState({emailSent: true})
        setTimeout(() => {
          this.setState({emailSent: false})
        }, 5000)
    }).catch(error => {
      console.error(error)
    });
  }

  render() {
    const {switchPageToRegistration} = this.props
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
            <AddButton
              type="submit"
              className="btn btn-default">
              Přihlásit
            </AddButton>
            <div style={{marginTop: 10}}>
              Pokud jsi tu poprvé, <a style={{color: 'red'}} onClick={switchPageToRegistration}>zaregistruj se</a>. Registrace slouží pro možnost pozdější editace zadaných cest.
            </div>
            <div>
              Pokud jsi zapomněl heslo, zadej svůj email a klikni <a style={{color: 'red'}} onClick={this.handleResetPassword}>SEM</a>. Na email ti dojde link pro změnu hesla.
            </div>
            {this.state.emailSent && <div style={{textAlign: 'center', color: 'red', paddingTop: 10}}>Email odeslán</div>}
          </div>
        </Form>
      </div>
    );
  }
}


Login.propTypes = {
  switchPageToRegistration: PropTypes.function
}
