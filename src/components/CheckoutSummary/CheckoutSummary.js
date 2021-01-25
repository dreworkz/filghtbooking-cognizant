import React from "react";
import Button from "../../components/Button/Button";
import Flight from "../FlightBooking/Flight/Flight";

import * as labels from "../../constants/Labels";
import * as messages from "../../constants/Messages";

const checkoutSummary = (props) => {
  let flightsSummary = props.flights.map((flt) => (
    <Flight
      key={flt.id}
      flightFrom={flt.from}
      flightTo={flt.to}
      seat={flt.seat}
      price={flt.price.toFixed(2)}
      date={flt.date}
      time={flt.time}
      btnType="Hidden"
    />
  ));

  return (
    <React.Fragment>
      <h3>{labels.SUMMARY}</h3>
      <p>{messages.SUMMARY_MESSAGE}</p>

      {flightsSummary}

      <p>
        <strong>
          {labels.TOTAL_PRICE_1}
          {props.price.toFixed(2)}
        </strong>
      </p>

      <p>{messages.CONTINUE_CHECKOUT}</p>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        {labels.CONTINUE_BUTTON}
      </Button>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        {labels.CANCEL_BUTTON}
      </Button>
    </React.Fragment>
  );
};

export default checkoutSummary;
