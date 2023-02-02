import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers({
  user, // está funcionando como user: user, sendo o segundo user o que é importado na linha 2
  wallet, // mesma coisa que acima, mas importando da linha 3
});

export default rootReducer;
