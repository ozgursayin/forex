import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CurrencyConverter from "./components/CurrencyConverter";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Wallet from "./components/Wallet";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/charts" component={CurrencyConverter} />
          <Route path="/wallet" component={Wallet} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
