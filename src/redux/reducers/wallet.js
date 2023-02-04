// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DELETE_EXPENSES, SAVE_EXPENSES, SAVE_VALUES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
};

function walletReducer(state = INITIAL_STATE, { type, payload /* , id */ }) {
  switch (type) {
  case SAVE_VALUES:
    return {
      ...state,
      currencies: payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...payload }],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== payload),
    };
  default:
    return state;
  }
}

export default walletReducer;
