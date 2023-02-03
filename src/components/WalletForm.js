import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, saveExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    isDisabled: true,
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.addButton());
  };

  fetchCurrencies = async () => {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const fetchAPIJSON = await fetchAPI.json();
    const filteredCurrencies = Object.keys(fetchAPIJSON)
      .filter((element) => element !== 'USDT');

    this.globalStateCurrencies(filteredCurrencies);
  };

  globalStateCurrencies = (element) => {
    const { dispatch } = this.props;
    dispatch(saveCurrencies(element));
  };

  addButton = () => {
    const { value, description } = this.state;
    if (value.length > 0 && description.length > 0) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  saveGlobalState = async () => {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await fetchAPI.json();
    delete exchangeRates.USDT;

    const {
      id,
      value,
      description,
      currency,
      method,
      tag } = this.state;

    const { dispatch } = this.props;

    const arrayParaRedux = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(saveExpenses(arrayParaRedux));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isDisabled: true,
    }));
  };

  render() {
    const { isDisabled, value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        Valor:
        <input
          name="value"
          data-testid="value-input"
          type="text"
          value={ value }
          onChange={ this.handleChange }
        />
        Descrição:
        <input
          name="description"
          data-testid="description-input"
          type="text"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
          data-testid="currency-input"
        >
          {currencies.map((element) => (
            <option
              key={ element }
            >
              { element }
            </option>))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.saveGlobalState }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
