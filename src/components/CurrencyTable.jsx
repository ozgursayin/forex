import React, { useState, useEffect } from "react";
import { Button, Checkbox, Modal, Form } from "semantic-ui-react";
import "../App.css";

const CurrencyTable = ({ baseCurrency, priceData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCurrencies, setNewCurrencies] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    { value: "USD", text: "US Dollar", id: 1 },
    { value: "EUR", text: "Euro", id: 2 },
    { value: "GBP", text: "Pound Sterling", id: 3 },
  ]);

  const [options, setOptions] = useState([
    // { value: "USD", text: "US Dollar" },
    // { value: "EUR", text: "Euro" },
    // { value: "GBP", text: "Pound Sterling" },
    // // { value: "BTC", text: "BTC" },
    // { value: "TRY", text: "Turkish Lira" },
    { value: "AUD", text: "Australian Dollar", id: 4 },
    { value: "SGD", text: "Singapore Dollar", id: 5 },
    { value: "BRL", text: "Brazilian Real", id: 6 },
    { value: "CAD", text: "Canadian Dollar", id: 7 },
    { value: "CHF", text: "Swiss Franc", id: 8 },
    { value: "DKK", text: "Denmark Kron", id: 9 },
    { value: "HKD", text: "Hong Kong Dollar", id: 10 },
    { value: "JPY", text: "Japanese Yen", id: 11 },
    { value: "SEK", text: "Swedish Kron", id: 12 },
    { value: "ISK", text: "Icelandic Kron", id: 13 },
    { value: "PHP", text: "Philippine Peso", id: 14 },
    { value: "HUF", text: "Hungarian Forint", id: 15 },
    { value: "CZK", text: "Czech Kron", id: 16 },
    { value: "INR", text: "Indian Rupee", id: 17 },
    { value: "CNY", text: "Chinese Yuan", id: 18 },
    { value: "NZD", text: "New Zealand Dollar", id: 19 },
    { value: "MXN", text: "Mexican Peso", id: 20 },
    { value: "ILS", text: "Israeli Shekel", id: 21 },
    { value: "IDR", text: "Indonesian Rupiah", id: 22 },
    { value: "RUB", text: "Russian Ruble", id: 23 },
  ]);

  const handleSubmit = (e, data) => {
    if (newCurrencies.length > 0) {
      setSelectedCurrencies([...selectedCurrencies, ...newCurrencies]);
    }
    setModalOpen(false);
    setNewCurrencies([]);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewCurrencies(newCurrencies);
  };

  const handleChange = (e, data) => {
    let addedCurrencies = [...newCurrencies];
    console.log(data);
    if (data.checked === true) {
      addedCurrencies.push({
        value: data.value,
        text: data.text,
        id: data.id,
        delete: "X",
      });
    } else {
      addedCurrencies = addedCurrencies.filter((a) => a.value !== data.value);
    }
    setNewCurrencies(addedCurrencies);
    console.log(addedCurrencies);
  };

  const handleDeleteCurrency = (value, text, id) => {
    const currencyAddedToOptions = [...options];
    currencyAddedToOptions.push({ value, text, id });
    console.log(currencyAddedToOptions);
    const selectedCurrenciesFiltered = selectedCurrencies.filter(
      (s) => s.value !== value
    );

    currencyAddedToOptions.sort(function (a, b) {
      return a.id - b.id;
    });

    setSelectedCurrencies(selectedCurrenciesFiltered);
    setOptions(currencyAddedToOptions);
  };
  const selectedValues = selectedCurrencies.map(
    (selectedValue) => selectedValue.value
  );
  useEffect(() => {
    console.log(selectedValues);
    const updatedOptions = options.filter(
      (option) => !selectedValues.includes(option.value)
    );
    setOptions(updatedOptions);
    console.log(options);
  }, [selectedCurrencies]);

  const modalContent = options.map((option, index) => (
    <div key={option.id}>
      <Checkbox
        toggle
        onChange={handleChange}
        value={option.value}
        text={option.text}
        id={option.id}
        // defaultChecked={selectedValues.includes(option.value) ? "true" : null}
      />
      <span> </span>
      <div className="ui fitted toggle checkbox">
        <input type="checkbox" className="hidden" readOnly="" tabIndex="0" />

        <h4>
          {option.value} <h5>{option.text}</h5>
        </h4>
      </div>
    </div>
  ));

  const overview = selectedCurrencies.map((selectedCurrency, index) => {
    console.log(selectedCurrency);
    return (
      <tbody key={selectedCurrency["id"]}>
        <tr>
          <td>
            <h4 className="ui image header">
              <div className="content">
                1 {selectedCurrency["value"]}
                <div className="sub header">{selectedCurrency["text"]}</div>
              </div>
            </h4>
          </td>
          <td>
            {priceData.rates[selectedCurrency["value"]] !== undefined
              ? (1 / priceData.rates[selectedCurrency["value"]]).toFixed(4) +
                `  ${baseCurrency}`
              : "1.000"}
          </td>
          <td className="narrow">
            {selectedCurrency["delete"] === "X" ? (
              <Button
                icon="delete"
                size="medium"
                className="red"
                onClick={() =>
                  handleDeleteCurrency(
                    selectedCurrency["value"],
                    selectedCurrency["text"],
                    selectedCurrency["id"]
                  )
                }
              />
            ) : (
              <Button icon="delete" size="medium" className="red" disabled />
            )}
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className="currency-table">
      <table className="ui celled padded table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Remove</th>
          </tr>
        </thead>
        {overview}
      </table>
      <div className="currency-add-button">
        <Button className="blue" onClick={() => setModalOpen(true)}>
          +
        </Button>
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
        <Modal.Content scrolling>{modalContent}</Modal.Content>

        <Modal.Actions>
          <Button
            type="cancel"
            color="red"
            content="Close"
            modalContent={modalContent}
            onClick={handleCancel}
          />
          <Button
            type="submit"
            color="green"
            content="Save"
            modalContent={modalContent}
            onClick={handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CurrencyTable;
