import React from "react";
import classes from "./Flight.module.css";
import * as labels from "../../../constants/Labels";

import Button from "../../Button/Button";

const flight = (props) => (
  <React.Fragment>
    <div className={classes.Flight}>
      <div>
        <div>
          <strong>
            {props.flightFrom} {` → `} {props.flightTo}
          </strong>
        </div>
        <h5>
          {labels.SEAT_1} {props.seat}
        </h5>
        <h5>
          {labels.PRICE_1}
          {props.price}
        </h5>
        <h5>
          {labels.DATE_1} {props.date}
        </h5>
        <h5>
          {labels.TIME_1} {props.time}
        </h5>
      </div>

      <Button
        clicked={props.clicked}
        btnType={props.btnType}
        disabled={props.disabled}
      >
        {props.btnMsg}
      </Button>
    </div>
    <hr />
  </React.Fragment>
);

export default flight;
