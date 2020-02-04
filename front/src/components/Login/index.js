import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import './login.scss';

class Login extends React.Component {
  componentWillUnmount() {
    const { clearForm } = this.props;
    clearForm();
  }

  render() {
    const {
      emailValue,
      passwordValue,
      changeInputValue,
      doConnect,
      logged,
    } = this.props;

    const handleChange = (evt) => {
      const { value: fieldValue } = evt.target;
      const fieldName = evt.target.id;
      changeInputValue(fieldValue, fieldName);
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();
      doConnect();
    };

    if (logged) {
      // Affichage de la redirection
      return <Redirect to="/" />;
    }

    return (
      <div id="container">
        <Form className="form" onSubmit={handleSubmit}>
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
          <Button type="submit" color="teal">Connectez-vous</Button>
        </Form>
      </div>

    );
  }
}

Login.propTypes = {
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  changeInputValue: PropTypes.func.isRequired,
  doConnect: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  clearForm: PropTypes.func.isRequired,
};

export default Login;
