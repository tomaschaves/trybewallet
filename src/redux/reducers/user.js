import { SAVE_EMAIL_LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, { type, payload }) { // action desestruturada em type e payload
  switch (type) {
  case SAVE_EMAIL_LOGIN:
    return {
      email: payload,
    };
  default:
    return state;
  }
}

export default userReducer;
