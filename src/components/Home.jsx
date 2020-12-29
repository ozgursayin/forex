import React, { useState, useEffect } from "react";
import "../App.css";
import { Dimmer, Loader, Select } from "semantic-ui-react";
import CurrencyTable from "./CurrencyTable";
import optionsJSON from "../data/options.json";
import selectedCurrenciesJSON from "../data/selectedCurrencies.json";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState();
  const [fromCurrency, setFromCurrency] = useState("TRY");
  const options = [...selectedCurrenciesJSON, ...optionsJSON];
  const BASE_URL_CURRENCY = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`;

  const fetchCurrencies = async () => {
    setLoading(true);
    const result = await fetch(BASE_URL_CURRENCY);
    const resultCurrencies = await result.json();
    setPriceData(resultCurrencies);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fromCurrency]);

  if (priceData) {
    Object.entries(priceData.rates).map(([key, value]) => ({
      [key]: value,
    }));
  }

  const handleFromSelect = (e, data) => {
    setFromCurrency(data.value);
  };

  if (loading || !priceData) {
    return (
      <div>
        <Dimmer active inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }

  return (
    <div>
      <div className="price-container">
        <div className="form">
          <Select
            placeholder="Select your currency"
            onChange={handleFromSelect}
            options={options}
            value={fromCurrency}
          ></Select>
        </div>
        <div className="time-stamp">
          {new Date().toJSON().slice(0, 10)}
          {"  "}
          {new Date().toJSON().slice(11, 19)} GMT
        </div>
      </div>

      <CurrencyTable baseCurrency={fromCurrency} priceData={priceData} />
    </div>
  );
};

export default Home;
