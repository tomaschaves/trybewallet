// Coloque aqui suas actions
export const SAVE_EMAIL_LOGIN = 'SAVE_EMAIL_LOGIN';
export const SAVE_VALUES = 'SAVE_VALUES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_EXCHANGES = 'SAVE_EXCHANGES';

export const login = (payload) => ({
  type: 'SAVE_EMAIL_LOGIN',
  payload,
});

export const saveCurrencies = (payload) => ({
  type: 'SAVE_VALUES',
  payload,
});

export const saveExchangeCurrencies = (payload) => ({
  type: 'SAVE_EXCHANGES',
  payload,
});

export const saveExpenses = (payload) => ({
  type: 'SAVE_EXPENSES',
  payload,
});
