import React from "react";
import { Checkbox } from "semantic-ui-react";

const ModalContent = ({ options, handleToggle }) => {
  const modalContent = options.map((option) => (
    <div key={option.idd}>
      <Checkbox
        toggle
        onChange={handleToggle}
        value={option.value}
        text={option.text}
        idd={option.idd}
        flag={option.flag}
      />
      <span> </span>
      <div className="ui fitted toggle checkbox">
        <input type="checkbox" className="hidden" readOnly="" tabIndex="0" />
        <h4>
          {option.text} <i className={option.flag} />
        </h4>
      </div>
    </div>
  ));
  return <div>{modalContent}</div>;
};

export default ModalContent;
