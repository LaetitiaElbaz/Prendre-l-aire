import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import './signup.scss';

class Signup extends React.Component {
  componentWillUnmount() {
    const { clearForm } = this.props;
    clearForm();
  }

  render() {
    const {
      usernameValue,
      emailValue,
      passwordValue,
      passwordVerifyValue,
      changeInputValue,
      newUser,
      failPassword,
      submited,
    } = this.props;

    const handleChange = (evt) => {
      const { value: fieldValue } = evt.target;
      const fieldName = evt.target.id;
      changeInputValue(fieldValue, fieldName);
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();
      if (passwordValue === passwordVerifyValue) {
        newUser();
      }
      else {
        alert('Les deux mot de passe que vous avez saisis sont différents !');
        failPassword();
      }
    };

    if (submited) {
      return <Redirect to="/" />;
    }

    return (
      <div id="container">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor="username">
            Choisissez un pseudonyme
              <Form.Input
                type="text"
                icon="user"
                iconPosition="left"
                placeholder="Votre pseudonyme"
                id="username"
                name="username"
                value={usernameValue}
                onChange={handleChange}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">
            Saisissez votre email
              <Form.Input
                type="email"
                icon="mail"
                iconPosition="left"
                placeholder="Votre email"
                id="email"
                name="email"
                value={emailValue}
                onChange={handleChange}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
            Saisissez votre mot de passe
              <Form.Input
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Votre mot de passe"
                id="password"
                name="password"
                value={passwordValue}
                onChange={handleChange}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
            Confirmez votre mot de passe
              <Form.Input
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Confirmez votre mot de passe"
                id="passwordVerify"
                name="passwordVerify"
                value={passwordVerifyValue}
                onChange={handleChange}
              />
            </label>
          </Form.Field>
          <Button type="submit" color="teal">Inscrivez-vous</Button>
        </Form>
      </div>
    );
  }
}

Signup.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordVerifyValue: PropTypes.string.isRequired,
  changeInputValue: PropTypes.func.isRequired,
  newUser: PropTypes.func.isRequired,
  failPassword: PropTypes.func.isRequired,
  submited: PropTypes.bool.isRequired,
  clearForm: PropTypes.func.isRequired,
};

export default Signup;
