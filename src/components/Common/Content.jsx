import React from "react";
import { Button, Modal, Input } from "semantic-ui-react";
import RemoveButton from "../Common/RemoveButton";

const Content = ({
  selectedCurrencies,
  handleFromSelect,
  currencyConvert,
  handleRemoveCurrency,
  priceData,
  baseCurrency,
}) => {
  return selectedCurrencies.map((selectedCurrency) => (
    <div key={selectedCurrency.cid} className="currency-box">
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
            value={
              priceData
                ? priceData.rates[selectedCurrency["value"]] !== undefined
                  ? (1 / priceData.rates[selectedCurrency["value"]]).toFixed(
                      4
                    ) + `  ${baseCurrency}`
                  : "1.000 EUR"
                : null
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
};

export default Content;
