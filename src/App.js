import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WalletForm from './components/WalletForm';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ WalletForm } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
