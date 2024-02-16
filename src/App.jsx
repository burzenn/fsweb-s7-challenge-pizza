import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import OrderPizza from './components/OrderPizza';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/OrderPizza">
          <OrderPizza />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;