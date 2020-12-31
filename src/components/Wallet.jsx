import React, { useState, useEffect } from "react";
import "../App.css";
import selectedCurrenciesJSON from "../data/selectedCurrencies.json";
import optionsJSON from "../data/options.json";
import { Modal, Select, Input, Button } from "semantic-ui-react";
import ModalContent from "../components/ModalContent";
import RemoveButton from "./RemoveButton";

const Wallet = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newCurrencies, setNewCurrencies] = useState([]);
  const [priceData, setPriceData] = useState();
  const [fromCurrency, setFromCurrency] = useState("TRY");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [toCurrencyValue, setToCurrencyValue] = useState(0);
  const [total, setTotal] = useState([]);
  const [totalCache, setTotalCache] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    JSON.parse(localStorage.getItem("walletSelectedCurrencies")) ||
      selectedCurrenciesJSON
  );
  const [options, setOptions] = useState([
    ...selectedCurrenciesJSON,
    ...optionsJSON,
  ]);
  const baseCurrencyOptions = [...selectedCurrenciesJSON, ...optionsJSON];
  const BASE_URL_CURRENCY = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`;
  const selectedValues = selectedCurrencies.map(
    (selectedValue) => selectedValue.idd
  );

  localStorage.setItem(
    "walletSelectedCurrencies",
    JSON.stringify(selectedCurrencies)
  );

  const handleSubmit = () => {
    if (newCurrencies.length > 0) {
      const newSelectedCurrencies = [...selectedCurrencies, ...newCurrencies];
      setSelectedCurrencies(newSelectedCurrencies);
    }
    setModalOpen(false);
    setNewCurrencies([]);
  };
  const handleCancel = () => {
    setModalOpen(false);
    setNewCurrencies(newCurrencies);
  };

  const handleToggle = (e, data) => {
    let addedCurrencies = [...newCurrencies];
    if (data.checked === true) {
      addedCurrencies.push({
        value: data.value,
        text: data.text,
        idd: data.idd,
        flag: data.flag,
        delete: "X",
      });
    } else {
      addedCurrencies = addedCurrencies.filter(
        (addedCurrency) => addedCurrency.value !== data.value
      );
    }
    setNewCurrencies(addedCurrencies);
  };

  const handleTotalAmount = () => {
    const totalValueObject = Object.values(total);
    let totalAmountNumber = 0;
    totalValueObject.forEach((t) => (totalAmountNumber += parseFloat(t)));
    setTotalAmount(totalAmountNumber);
  };

  const handleRemoveCurrency = (value, text, idd, flag) => {
    const currencyAddedToOptions = [...options];
    currencyAddedToOptions.push({ value, text, idd, flag });
    const selectedCurrenciesFiltered = selectedCurrencies.filter(
      (s) => s.idd !== idd
    );
    if (total[value]) {
      total[value] = 0;
    }
    handleTotalAmount();
    currencyAddedToOptions.sort(function (a, b) {
      return a.idd - b.idd;
    });
    setTotal(total);
    setSelectedCurrencies(selectedCurrenciesFiltered);
    setOptions(currencyAddedToOptions);
  };
  useEffect(() => {
    const updatedOptions = options.filter(
      (option) => !selectedValues.includes(option.idd)
    );
    setOptions(updatedOptions);
  }, [selectedCurrencies]);

  const fetchCurrencies = async () => {
    setLoading(true);
    const result = await fetch(BASE_URL_CURRENCY);
    const resultCurrencies = await result.json();
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

  useEffect(() => {
    fetchCurrencies();
    setTotalAmount(0);
    setToCurrencyValue(0);
  }, []);

  useEffect(() => {
    fetchCurrencies();
    setTotalAmount(0);
    setTotal([]);
  }, [fromCurrency, toCurrency]);

  if (priceData) {
    Object.entries(priceData.rates).map(([key, value]) => ({
      [key]: value,
    }));
  }

  const handleFromSelect = (e, data) => {
    setFromCurrency(data.value);
  };

  const currencyConvert = (e, data) => {
    setToCurrencyValue(
      priceData &&
        parseFloat(toCurrencyValue) +
          (data.value * (1 / priceData.rates[data.currency])).toFixed(4)
    );

    if (data) {
      total[data.currency] = parseFloat(
        data.value * parseFloat(1 / priceData.rates[data.currency])
      ).toFixed(4);
    }
    handleTotalAmount();
  };

  const walletContent = selectedCurrencies.map((selectedCurrency) => (
    <div key={selectedCurrency.idd} className="currency-box">
      <td>
        <div className="ui segment ">
          <i className={selectedCurrency["flag"] + " flag"} />
          <Input
            className="currency-name"
            onChange={handleFromSelect}
            value={selectedCurrency.text}
          />
          <Input
            className="currency-name"
            onChange={currencyConvert}
            placeholder="Enter an amount"
            currency={selectedCurrency.value}
          />
          <span> </span>
          <RemoveButton
            selectedCurrency={selectedCurrency}
            handleRemoveCurrency={handleRemoveCurrency}
          />
        </div>
      </td>
    </div>
  ));
  const baseCurrencyContent = (
    <div className="price-container">
      <div className="form">
        <Select
          placeholder="Select your currency"
          onChange={handleFromSelect}
          options={baseCurrencyOptions}
          value={fromCurrency}
        ></Select>
        <h1>
          TOTAL AMOUNT:
          <h2>{fromCurrency}</h2>
          <h2>{parseFloat(totalAmount.toFixed(2)).toLocaleString()}</h2>
        </h1>
      </div>
      <div className="time-stamp">
        {new Date().toJSON().slice(0, 10)}
        {"  "}
        {new Date().toJSON().slice(11, 19)} GMT
      </div>
    </div>
  );

  const baseCurrencyContent2 = (
    <div className="base-currency">
      <div className="form">
        <td>
          <Select
            placeholder="Select your currency"
            onChange={handleFromSelect}
            options={baseCurrencyOptions}
            value={fromCurrency}
          ></Select>
          <h1>
            TOTAL AMOUNT:
            <h2>{fromCurrency}</h2>
            <h2>{parseFloat(totalAmount.toFixed(2)).toLocaleString()}</h2>
          </h1>
        </td>
      </div>
    </div>
  );

  if (loading || !priceData) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  return (
    <div className="currency-table">
      {total}
      <div className="currency-list">
        <div className="form">
          <tbody>
            <tr>
              {baseCurrencyContent}
              {walletContent}
            </tr>
          </tbody>
        </div>
        <div className="wallet-currency-add-button">
          <Button className="blue " onClick={() => setModalOpen(true)}>
            +
          </Button>
        </div>
        <div className="time-stamp">
          {new Date().toJSON().slice(0, 10)}
          {"  "}
          {new Date().toJSON().slice(11, 19)} GMT
        </div>
      </div>

      <Modal
        closeIcon
        open={modalOpen}
        onSubmit={handleSubmit}
        size="mini"
        className="modal"
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
      >
        <Modal.Content scrolling>
          <ModalContent options={options} handleToggle={handleToggle} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="cancel"
            color="red"
            content="Close"
            modalContent={<ModalContent />}
            onClick={handleCancel}
          />
          <Button
            type="submit"
            color="green"
            content="Save"
            modalContent={<ModalContent />}
            onClick={handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Wallet;
