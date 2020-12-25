import React from "react";
import { Button, Dimmer, Loader, Select } from "semantic-ui-react";

const TimeRangeSelector = ({ handleTimeRange }) => {
  return (
    <div className="time-range-buttons">
      {/* <Button onClick={() => handleTimeRange(365 * 5)}> 5 Years</Button> */}
      <Button className="blue" onClick={() => handleTimeRange(370)}>
        1 Year
      </Button>
      <Button className="blue" onClick={() => handleTimeRange(185)}>
        6 Months
      </Button>
      <Button className="blue" onClick={() => handleTimeRange(93)}>
        3 Months
      </Button>
      <Button className="blue" onClick={() => handleTimeRange(31)}>
        1 Month
      </Button>
      <Button className="blue" onClick={() => handleTimeRange(14)}>
        2 Weeks
      </Button>
    </div>
  );
};

export default TimeRangeSelector;
