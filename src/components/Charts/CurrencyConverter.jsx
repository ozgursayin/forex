import React, { useState, useEffect } from "react";
import "../../App.css";
import { Card, Dimmer, Loader, Select } from "semantic-ui-react";
import Chart from "react-apexcharts";
import TimeRangeSelector from "../Common/TimeRangeSelector";
import optionsJSON from "../../data/options.json";
import selectedCurrenciesJSON from "../../data/selectedCurrencies.json";
import TimeStamp from "../Common/TimeStamp";

const CurrencyConverter = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);
  const [timeRange, setTimeRange] = useState(new Date() - 86400000 * 30);
  const BASE_URL_CURRENCY = `https://api.exchangeratesapi.io/latest?`;
  const HISTORICAL_CURRENCY_DATA = `https://api.exchangeratesapi.io/history`;
  const options = [...selectedCurrenciesJSON, ...optionsJSON];

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
              value={fromCurrency}
            ></Select>
            <Select
              placeholder="Select your currency"
              onChange={handleToSelect}
              options={options}
              value={toCurrency}
            ></Select>
          </div>
          <div className="chart-price">
            <Card className="chart-content">
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
              <TimeStamp />
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
