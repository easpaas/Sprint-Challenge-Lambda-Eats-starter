import React from "react";
import { Route } from 'react-router-dom';

import Home from './components/Home';
import PizzaForm from './components/PizzaForm';


const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route path="/pizza" component={PizzaForm}/>
    </div>
  );
};
export default App;
