// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
};

function walletReducer(state = INITIAL_STATE, { type /* , payload, id */ }) {
  switch (type) {
  case 'VALUE':
    return state;
  default:
    return state;
  }
}

export default walletReducer;