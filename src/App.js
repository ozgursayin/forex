import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CurrencyConverter from "./components/Charts/CurrencyConverter";
import Navbar from "./components/Common/Navbar";
import Home from "./components/Home/Home";
import Wallet from "./components/Wallet/Wallet";

const App = () => {
  return (
    <div>
      <body>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/charts" component={CurrencyConverter} />
            <Route path="/wallet" component={Wallet} />
          </Switch>
        </BrowserRouter>
      </body>
    </div>
  );
};

export default App;
