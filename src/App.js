import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CurrencyConverter from "./components/CurrencyConverter";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Wallet from "./components/Wallet";
import Wallett from "./components/Wallett";

const App = () => {
  return (
    <div>
      <body>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/charts" component={CurrencyConverter} />
            <Route path="/wallet" component={Wallett} />
          </Switch>
        </BrowserRouter>
      </body>
    </div>
  );
};

export default App;
