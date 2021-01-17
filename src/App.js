import React from "react";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import CurrencyConverter from "./components/Charts/CurrencyConverter";
import Navbar from "./components/Common/Navbar";
import Home from "./components/Home/Home";
import Wallet from "./components/Wallet/Wallet";

const App = () => {
  return (
    <div>
      <body>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/charts" component={CurrencyConverter} />
            <Route path="/wallet" component={Wallet} />
          </Switch>
        </HashRouter>
      </body>
    </div>
  );
};

export default App;
