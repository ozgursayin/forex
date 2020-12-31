import React from "react";
import { Select } from "semantic-ui-react";

const BaseCurrencySelector = ({ handleFromSelect, options, fromCurrency }) => {
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
      </div>
    </div>
  );
};

export default BaseCurrencySelector;
