import React, { useState, useEffect } from "react";
import "../App.css";
import { Dimmer, Loader, Select, Input, Form } from "semantic-ui-react";

const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState();
  const [fromCurrency, setFromCurrency] = useState("TRY");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [toCurrencyValue, setToCurrencyValue] = useState(0);
  const [total, setTotal] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    { value: "USD", text: "US Dollar", id: 1, flag: "us flag" },
    { value: "EUR", text: "Euro", id: 2, flag: "eu flag" },
    { value: "GBP", text: "Pound Sterling", id: 3, flag: "uk flag" },
    { value: "TRY", text: "Turkish Lira", id: 4, flag: "tr flag" },
    { value: "AUD", text: "Australian Dollar", id: 5, flag: "au flag" },
    { value: "SGD", text: "Singapore Dollar", id: 6, flag: "sg flag" },
    { value: "CAD", text: "Canadian Dollar", id: 7, flag: "ca flag" },
    { value: "CHF", text: "Swiss Franc", id: 8, flag: "ch flag" },
    { value: "DKK", text: "Denmark Kron", id: 9, flag: "dk flag" },
    { value: "HKD", text: "Hong Kong Dollar", id: 10, flag: "hk flag" },
    { value: "JPY", text: "Japanese Yen", id: 11, flag: "jp flag" },
    { value: "SEK", text: "Swedish Kron", id: 12, flag: "se flag" },
    { value: "ISK", text: "Icelandic Kron", id: 13, flag: "is flag" },
    { value: "PHP", text: "Philippine Peso", id: 14, flag: "ph flag" },
    { value: "HUF", text: "Hungarian Forint", id: 15, flag: "hu flag" },
    { value: "CZK", text: "Czech Kron", id: 16, flag: "cz flag" },
    { value: "INR", text: "Indian Rupee", id: 17, flag: "in flag" },
    { value: "CNY", text: "Chinese Yuan", id: 18, flag: "cn flag" },
    { value: "NZD", text: "New Zealand Dollar", id: 19, flag: "nz flag" },
    { value: "MXN", text: "Mexican Peso", id: 20, flag: "mx flag" },
    { value: "ILS", text: "Israeli Shekel", id: 21, flag: "il flag" },
    { value: "IDR", text: "Indonesian Rupiah", id: 22, flag: "id flag" },
    { value: "RUB", text: "Russian Ruble", id: 23, flag: "ru flag" },
    { value: "BRL", text: "Brazilian Real", id: 24, flag: "br flag" },
  ]);

  const options = [
    { value: "TRY", text: "TRY" },
    { value: "USD", text: "USD" },
    { value: "EUR", text: "EUR" },
    { value: "GBP", text: "GBP" },
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
    console.log(resultCurrencies);
    console.log({ ...resultCurrencies.rates, EUR: 1 });
    if (fromCurrency === "EUR") {
      const euroResultCurrencies = {
        ...resultCurrencies,
        rates: { ...resultCurrencies.rates, EUR: 1 },
      };

      setPriceData(euroResultCurrencies);
      setLoading(false);
      return;
    }
    setPriceData(resultCurrencies);
    setLoading(false);
  };
  //console.log(priceData && priceData.rates[toCurrency]);
  useEffect(() => {
    fetchCurrencies();
    setTotalAmount(0);
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
    setTotalAmount(0);
  }, [fromCurrency, toCurrency]);

  if (priceData) {
    Object.entries(priceData.rates).map(([key, value]) => ({
      [key]: value,
    }));
  }

  const handleFromSelect = (e, data) => {
    setFromCurrency(data.value);
    const currencies = [...selectedCurrencies];
    console.log(currencies);
  };

  // const handleToSelect = (e, data) => {
  //   setToCurrency(data.value);
  // };
  // console.log(toCurrency);

  const currencyConvert = (e, data) => {
    console.log(priceData);
    setToCurrencyValue(
      priceData &&
        parseFloat(toCurrencyValue) +
          (data.value * (1 / priceData.rates[data.id])).toFixed(4)
    );
    // setTotal([]);
    let result = total;

    if (data) {
      result[data.id] = {
        [data.id]: parseFloat(
          data.value * parseFloat(1 / priceData.rates[data.id])
        ).toFixed(4),
      };
    }
    //setTotal(result);
    const totalValueObject = Object.values(total);
    let totalValueNumber = 0;
    totalValueObject.forEach(
      (t) => (totalValueNumber += parseFloat(Object.values(t)))
    );
    console.log(total);
    setTotalAmount(totalValueNumber);
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
        <div className="currency-list">
          <div className="form">
            <tbody key={1}>
              <tr>
                {selectedCurrencies.map((s) => (
                  <div>
                    <td>
                      <div className="ui segment">
                        <i className={s.flag}> </i>
                        <Input
                          placeholder="Select your currency"
                          onChange={handleFromSelect}
                          options={options}
                          value={`${s.value}   ${s.text}`}
                        />
                        <Input onChange={currencyConvert} id={s.value} />
                      </div>
                    </td>
                  </div>
                ))}

                <div className="base-currency">
                  <td>
                    <Select
                      placeholder="Select your currency"
                      onChange={handleFromSelect}
                      options={options}
                      value={fromCurrency}
                    ></Select>

                    <Input value={totalAmount.toFixed(4)} />
                  </td>
                </div>
              </tr>
            </tbody>
          </div>

          <div className="time-stamp">
            {new Date().toJSON().slice(0, 10)}
            {"  "}
            {new Date().toJSON().slice(11, 19)} GMT
          </div>
        </div>
      )}
      {/* <CurrencyTable baseCurrency={fromCurrency} priceData={priceData} /> */}
    </div>
  );
};

export default Wallet;
