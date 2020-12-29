import React from "react";
import { Button } from "semantic-ui-react";

const RemoveButton = ({
  selectedCurrency,
  handleRemoveCurrency,
  clearInput,
}) => {
  return (
    <>
      {selectedCurrency["delete"] === "X" ? (
        <Button
          icon="delete"
          size="tiny"
          className="red"
          onClick={() =>
            handleRemoveCurrency(
              selectedCurrency["value"],
              selectedCurrency["text"],
              selectedCurrency["idd"],
              selectedCurrency["flag"]
            )
          }
        />
      ) : (
        <Button icon="circle outline" size="tiny" className="red" disabled />
      )}
    </>
  );
};

export default RemoveButton;
