import React, { useState, useEffect } from "react";
import "../App.css";
import { Card, Dimmer, Loader, Select } from "semantic-ui-react";
import Chart from "react-apexcharts";
import TimeRangeSelector from "./TimeRangeSelector";
import Navbar from "./Navbar";
const CurrencyConverter = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);
  const [timeRange, setTimeRange] = useState(new Date() - 86400000 * 30);

  const BASE_URL_BITCOIN = `https://api.coindesk.com/v1/bpi/currentprice.json`;
  const BASE_URL_CURRENCY = `https://api.exchangeratesapi.io/latest?`;
  const HISTORICAL_BITCOIN_DATA = `https://api.coindesk.com/v1/bpi/historical/close.json`;
  const HISTORICAL_CURRENCY_DATA = `https://api.exchangeratesapi.io/history`;

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

  const handleFromSelect = (e, data) => {
    setFromCurrency(data.value);
  };

  const handleToSelect = (e, data) => {
    setToCurrency(data.value);
  };
  const handleTimeRange = (days) => {
    const dayInMilliseconds = 86400000;
    const timeRange = new Date() - dayInMilliseconds * days;
    setTimeRange(timeRange);
  };
  const dateConverter = (timeRange) => {
    const date = new Date(timeRange);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const fullDate = `${year}-${month}-${day}`;
    return fullDate;
  };
  const today = dateConverter(new Date());
  const startDate = dateConverter(timeRange);

  const getLatestCurrencyData = async () => {
    const response = await fetch(
      `${BASE_URL_CURRENCY}&base=${fromCurrency}&symbols=${toCurrency}`
    );
    const data = await response.json();

    if (fromCurrency === "EUR" && toCurrency === "EUR") {
      setPriceData("1.0000");
      return;
    }
    setPriceData(data.rates[toCurrency].toFixed(4));
    setLoading(false);
  };

  const getHistoricalCurrencyData = async () => {
    let response = "";
    if (fromCurrency === "EUR" && toCurrency === "EUR") {
      response = await fetch(
        `${HISTORICAL_CURRENCY_DATA}?start_at=${startDate}&end_at=${today}&base=USD&symbols=USD`
      );
    } else {
      response = await fetch(
        `${HISTORICAL_CURRENCY_DATA}?start_at=${startDate}&end_at=${today}&base=${fromCurrency}&symbols=${toCurrency}`
      );
    }

    const data = await response.json();
    console.log(data.rates);
    const orderedDates = {};
    Object.keys(data.rates)
      .sort(function (a, b) {
        return a.split("-").join("").localeCompare(b.split("-").join(""));
      })
      .forEach(function (key) {
        orderedDates[key] = data.rates[key];
      });

    const categories = Object.keys(orderedDates);
    const seriesLong = Object.values(orderedDates);
    console.log(categories, seriesLong);
    const series = [];
    seriesLong.forEach((serie) => {
      series.push(
        serie[toCurrency] !== undefined ? serie[toCurrency].toFixed(4) : 1
      );
    });
    setChartData({
      xaxis: {
        categories: categories,
      },
    });
    setSeries([{ text: fromCurrency, data: series }]);
    setLoading(false);
  };

  // const getChartData = async () => {
  //   const response = await fetch(HISTORICAL_BITCOIN_DATA);
  //   const data = await response.json();
  //   const categories = Object.keys(data.bpi);
  //   const seriesLong = Object.keys(data.bpi);
  //   console.log(data);
  //   const series = [];
  //   seriesLong.forEach((serie) => {
  //     series.push(parseFloat(serie.toFixed(2)));
  //   });

  //   console.log(series);
  //   setChartData({
  //     xaxis: {
  //       categories: categories,
  //     },
  //   });
  //   setSeries([{ text: "Bitcoin Price", data: series }]);
  //   setLoading(false);
  // };
  const fetchCurrentBitcoinData = async () => {
    const response = await fetch(BASE_URL_BITCOIN);
    const data = await response.json();

    setPriceData(data.bpi[fromCurrency].rate);
    console.log(data.bpi !== null && data.bpi[fromCurrency].rate);
    //getChartData();
    //getHistoricalCurrencyData();
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchCurrentBitcoinData();
  // }, []);

  useEffect(() => {
    getHistoricalCurrencyData();
    getLatestCurrencyData();
  }, [toCurrency, fromCurrency, timeRange]);

  return (
    <div className="App">
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
              //defaultkey="USD"
              value={fromCurrency}
            ></Select>
            <Select
              placeholder="Select your currency"
              onChange={handleToSelect}
              options={options}
              //defaultkey="TRY"
              value={toCurrency}
            ></Select>
          </div>

          <div className="price">
            <Card>
              <Card.Content>
                <Card.Header> </Card.Header>
                <Card.Description>
                  1 {fromCurrency}
                  {" =  "}
                  <strong>{priceData}</strong>
                  {"   "}
                  <strong>{toCurrency}</strong>
                  {"   "}
                </Card.Description>
              </Card.Content>
              <div className="time-stamp">
                {new Date().toJSON().slice(0, 10)}
                {"  "}
                {new Date().toJSON().slice(11, 19)} GMT
              </div>
            </Card>
          </div>
        </div>
      )}
      <TimeRangeSelector handleTimeRange={handleTimeRange} />
      <div>
        {series && chartData ? (
          <Chart
            options={chartData}
            series={series}
            type="line"
            width="1200"
            height="300"
          />
        ) : null}
      </div>
    </div>
  );
};

export default CurrencyConverter;
