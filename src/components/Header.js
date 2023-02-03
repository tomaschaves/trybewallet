import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    // console.log(expenses);
    let sum = 0;
    expenses.forEach((expense) => {
      const coin = Object.values(expense.exchangeRates)
        .find((element) => element.code === expense.currency).ask;
      // console.log('moeda', coin);
      sum += parseFloat(expense.value * coin);
    });
    // no resultado da multiplicação eu preciso fixar (tofix) duas casas decimais
    // o to fixed transforma
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <div>
          Gastos:
          <p data-testid="total-field">{ this.totalSum() }</p>
        </div>
        <div>
          Moeda:
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
