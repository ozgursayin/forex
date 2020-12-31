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
          className="red delete-button"
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
        <Button
          className="red delete-button"
          icon="circle outline"
          size="tiny"
          disabled
        />
      )}
    </>
  );
};

export default RemoveButton;
