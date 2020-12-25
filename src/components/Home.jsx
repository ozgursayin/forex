import React, { useState, useEffect } from "react";
import "../App.css";
import { Dimmer, Loader, Select } from "semantic-ui-react";
import CurrencyTable from "./CurrencyTable";
import Navbar from "./Navbar";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState();
  const [fromCurrency, setFromCurrency] = useState("TRY");

  const options = [
    { value: "TRY", text: "TRY" },
    { value: "USD", text: "USD" },
    { value: "EUR", text: "EUR" },
    { value: "GBP", text: "GBP" },
    // { value: "BTC", text: "BTC" },

    { value: "AUD", text: "AUD" },
    { value: "SGD", text: "SGD" },
    { value: "BGN", text: "BGN" },
    { value: "BRL", text: "BRL" },
    { value: "CAD", text: "CAD" },
    { value: "CHF", text: "CHF" },
    { value: "DKK", text: "DKK" },
    { value: "HKD", text: "HKD" },
    { value: "JPY", text: "JPY" },
    { value: "SEK", text: "SEK" },
    { value: "ISK", text: "ISK" },
    { value: "PHP", text: "PHP" },
    { value: "HUF", text: "HUF" },
    { value: "CZK", text: "CZK" },
    { value: "INR", text: "INR" },
    { value: "CNY", text: "CNY" },
    { value: "NZD", text: "NZD" },
    { value: "MXN", text: "MXN" },
    { value: "ILS", text: "ILS" },
    { value: "IDR", text: "IDR" },
    { value: "RUB", text: "RUB" },
  ];

  const BASE_URL_CURRENCY = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`;

  const fetchCurrencies = async () => {
    setLoading(true);
    const result = await fetch(BASE_URL_CURRENCY);
    const resultCurrencies = await result.json();
    // if (fromCurrency === "EUR") {
    //   setPriceData("1.0000");
    //   return;
    // }
    setPriceData(resultCurrencies);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  //   const getLatestCurrencyData = async () => {
  //     const response = await fetch(`${BASE_URL_CURRENCY}&base=TRY`);
  //     const data = await response.json();
  //     // if (fromCurrency === "EUR" && toCurrency === "EUR") {
  //     //   setPriceData("1.0000");
  //     //   return;
  //     // }

  //     Object.keys(data.rates).forEach((key) => {
  //       console.log(key);
  //     });
  //     Object.values(data.rates).forEach((value) => {
  //       console.log(value);
  //     });
  //     console.log(data.rates);
  //     setPriceData(data.rates);
  //     setLoading(false);
  //   };

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
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  return (
    <div>
      {loading ? (
        <div>
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      ) : (
        <div className="price-container">
          <div className="form">
            <Select
              placeholder="Select your currency"
              onChange={handleFromSelect}
              options={options}
              //defaultValue="TRY"
              value={fromCurrency}
            ></Select>
            {/* <Select
              placeholder="Select your currency"
              onChange={handleToSelect}
              options={options}
              defaultValue="TRY"
            ></Select> */}
          </div>

          <div className="time-stamp">
            {new Date().toJSON().slice(0, 10)}
            {"  "}
            {new Date().toJSON().slice(11, 19)} GMT
          </div>
        </div>
      )}
      <CurrencyTable baseCurrency={fromCurrency} priceData={priceData} />
    </div>
  );
};

export default Home;
