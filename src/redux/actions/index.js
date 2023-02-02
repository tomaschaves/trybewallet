// Coloque aqui suas actions
export const SAVE_EMAIL_LOGIN = 'SAVE_EMAIL_LOGIN';
export const SAVE_VALUES = 'SAVE_VALUES';

export const login = (payload) => ({
  type: 'SAVE_EMAIL_LOGIN',
  payload,
});

export const saveCurrencies = (payload) => ({
  type: 'SAVE_VALUES',
  payload,
});
