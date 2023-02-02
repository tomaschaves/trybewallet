import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';

class WalletForm extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.handleInfos());
  };

  handleInfos = () => {
    const { email, password } = this.state;
    const minimumLength = 6;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordLength = password.length >= minimumLength;
    const validateEmail = regexEmail.test(email);
    this.setState({
      isDisabled: !(passwordLength && validateEmail),
    });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <form>
        Email:
        <input
          name="email"
          data-testid="email-input"
          type="text"
          onChange={ this.handleChange }
        />
        Senha:
        <input
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});

WalletForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
