import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Input } from "semantic-ui-react";
import selectedCurrenciesJSON from "../data/selectedCurrencies.json";
import optionsJSON from "../data/options.json";
import ModalContent from "../components/ModalContent";
import "../App.css";
import RemoveButton from "./RemoveButton";

const CurrencyTable = ({ baseCurrency, priceData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCurrencies, setNewCurrencies] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    JSON.parse(localStorage.getItem("homeSelectedCurrencies")) ||
      selectedCurrenciesJSON
  );
  const [options, setOptions] = useState(optionsJSON);
  const selectedValues = selectedCurrencies.map(
    (selectedValue) => selectedValue.idd
  );
  localStorage.setItem(
    "homeSelectedCurrencies",
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

  const handleRemoveCurrency = (value, text, idd, flag) => {
    const currencyAddedToOptions = [...options];
    currencyAddedToOptions.push({ value, text, idd, flag });
    const selectedCurrenciesFiltered = selectedCurrencies.filter(
      (s) => s.idd !== idd
    );
    currencyAddedToOptions.sort(function (a, b) {
      return a.idd - b.idd;
    });
    setSelectedCurrencies(selectedCurrenciesFiltered);
    setOptions(currencyAddedToOptions);
  };

  useEffect(() => {
    const updatedOptions = options.filter(
      (option) => !selectedValues.includes(option.idd)
    );
    setOptions(updatedOptions);
  }, [selectedCurrencies]);
  const walletContent = selectedCurrencies.map((selectedCurrency) => (
    <div key={selectedCurrency.idd} className="currency-box">
      <td>
        <div className="ui segment ">
          <i className={selectedCurrency["flag"] + " flag"} />
          <Input
            className="currency-name"
            //onChange={handleFromSelect}
            value={selectedCurrency.text}
          />
          <Input
            className="currency-name"
            //onChange={currencyConvert}
            //placeholder="Enter an amount"
            currency={selectedCurrency.value}
            value={
              priceData.rates[selectedCurrency["value"]] !== undefined
                ? (1 / priceData.rates[selectedCurrency["value"]]).toFixed(4) +
                  `  ${baseCurrency}`
                : "1.000 EUR"
            }
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
  const overview = selectedCurrencies.map((selectedCurrency) => (
    <tbody key={selectedCurrency["idd"]}>
      <tr>
        <td>
          <h4 className="ui image header">
            <div className="currency-content">
              <i className={selectedCurrency["flag"] + " flag"} /> 1{" "}
              {selectedCurrency["text"]}
              <span> </span>
            </div>
          </h4>
        </td>
        <td>
          {priceData.rates[selectedCurrency["value"]] !== undefined
            ? (1 / priceData.rates[selectedCurrency["value"]]).toFixed(4) +
              `  ${baseCurrency}`
            : "1.000 EUR"}
        </td>
        <td>
          <RemoveButton
            selectedCurrency={selectedCurrency}
            handleRemoveCurrency={handleRemoveCurrency}
          />
        </td>
      </tr>
    </tbody>
  ));

  return (
    <div className="currency-table">
      <div className="currency-list">
        <div className="form">
          <tbody>
            <tr>{walletContent}</tr>
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

export default CurrencyTable;
