import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    // id: 0,
    // value: '',
    // description: '',
    // currency: 'USD',
    // method: 'Dinheiro',
    // category: 'Alimentação',
    currencies: [],
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  fetchCurrencies = async () => {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const fetchAPIJSON = await fetchAPI.json();
    const filteredCurrencies = Object.keys(fetchAPIJSON)
      .filter((element) => element !== 'USDT');
    this.setState({
      currencies: filteredCurrencies,
    }, () => this.globalStateCurrencies());
  };

  globalStateCurrencies = () => {
    const { dispatch } = this.props;
    const { currencies } = this.state;
    dispatch(saveCurrencies(currencies));
  };

  render() {
    const { currencies } = this.props;

    return (
      <form>
        Valor:
        <input
          name="value"
          data-testid="value-input"
          type="text"
          onChange={ this.handleChange }
        />
        Descrição:
        <input
          name="description"
          data-testid="description-input"
          type="text"
          onChange={ this.handleChange }
        />
        <select
          name="currency"
          onChange={ this.handleChange }
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
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="category"
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
