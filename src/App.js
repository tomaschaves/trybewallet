import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WalletForm from './components/WalletForm';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ WalletForm } />
    </Switch>
  );
}

export default App;
