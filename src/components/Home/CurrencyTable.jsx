import React, { useState, useEffect } from "react";
import { Button, Modal, Input } from "semantic-ui-react";
import selectedCurrenciesJSON from "../../data/selectedCurrencies.json";
import optionsJSON from "../../data/options.json";
import ModalContent from "../Common/ModalContent";
import "../../App.css";
import RemoveButton from "../Common/RemoveButton";
import TimeStamp from "../Common/TimeStamp";
import Content from "../Common/Content";

const CurrencyTable = ({ baseCurrency, priceData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCurrencies, setNewCurrencies] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    JSON.parse(localStorage.getItem("homeSelectedCurrencies")) ||
      selectedCurrenciesJSON
  );
  const [options, setOptions] = useState(optionsJSON);
  const selectedValues = selectedCurrencies.map(
    (selectedValue) => selectedValue.cid
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
        cid: data.cid,
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

  const handleRemoveCurrency = (value, text, cid, flag) => {
    const currencyAddedToOptions = [...options];
    currencyAddedToOptions.push({ value, text, cid, flag });
    const selectedCurrenciesFiltered = selectedCurrencies.filter(
      (s) => s.cid !== cid
    );
    currencyAddedToOptions.sort(function (a, b) {
      return a.cid - b.cid;
    });
    setSelectedCurrencies(selectedCurrenciesFiltered);
    setOptions(currencyAddedToOptions);
  };

  useEffect(() => {
    const updatedOptions = options.filter(
      (option) => !selectedValues.includes(option.cid)
    );
    setOptions(updatedOptions);
  }, [selectedCurrencies]);

  return (
    <div className="currency-table">
      <div className="currency-list">
        <div className="form">
          <tbody>
            <Content
              selectedCurrencies={selectedCurrencies}
              priceData={priceData}
              handleRemoveCurrency={handleRemoveCurrency}
              baseCurrency={baseCurrency}
            />
          </tbody>
        </div>
        <div className="currency-add-button">
          <Button className="blue " onClick={() => setModalOpen(true)}>
            +
          </Button>
        </div>
        <TimeStamp />
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
