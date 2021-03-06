import React, { useState, useEffect } from "react";
import "../../App.css";
import { Dimmer, Loader } from "semantic-ui-react";
import CurrencyTable from "./CurrencyTable";
import optionsJSON from "../../data/options.json";
import selectedCurrenciesJSON from "../../data/selectedCurrencies.json";
import BaseCurrencySelector from "../Common/BaseCurrencySelector";

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
      <BaseCurrencySelector
        handleFromSelect={handleFromSelect}
        options={options}
        fromCurrency={fromCurrency}
      />
      <CurrencyTable baseCurrency={fromCurrency} priceData={priceData} />
    </div>
  );
};

export default Home;
