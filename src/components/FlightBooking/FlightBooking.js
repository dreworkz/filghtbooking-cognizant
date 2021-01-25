import React, { useState, useEffect } from "react";
import classes from "./FlightBooking.module.css";
import { connect } from "react-redux";
import Flight from "./Flight/Flight";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import { bookFlight, cancelFlight } from "../../reducers/FlightReducer/actions";
import * as messages from "../../constants/Messages";
import * as labels from "../../constants/Labels";

const FlightBooking = (props) => {
  const [ableToBook, setAbleToBook] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const handleBookFlight = (flight) => {
    props.bookFlt(flight);
  };

  const handleCancelFlight = (flight) => {
    props.cancelFlt(flight);
  };

  const checkoutHandler = () => {
    setCheckingOut(true);
  };

  const checkoutCancelHandler = () => {
    setCheckingOut(false);
  };

  let availableFlights = props.availableFlightsList.map((flt) => (
    <Flight
      key={flt.id}
      flightFrom={flt.from}
      flightTo={flt.to}
      seat={flt.seat}
      price={flt.price.toFixed(2)}
      date={flt.date}
      time={flt.time}
      clicked={() => handleBookFlight(flt)}
      btnType="Success"
      btnMsg={labels.ADD_BUTTON}
    />
  ));

  if (availableFlights.length === 0) {
    availableFlights = <p>{messages.NO_FLIGHTS}</p>;
  }

  let yourFlights = props.bookedFlightsList.map((flt) => (
    <Flight
      key={flt.id}
      flightFrom={flt.from}
      flightTo={flt.to}
      seat={flt.seat}
      price={flt.price.toFixed(2)}
      date={flt.date}
      time={flt.time}
      clicked={() => handleCancelFlight(flt)}
      btnType="Danger"
      btnMsg={labels.REMOVE_BUTTON}
    />
  ));

  if (yourFlights.length === 0) {
    yourFlights = <p>{messages.NO_BOOKINGS}</p>;
  }

  let checkoutSummary = null;

  if (props.bookedFlightsList) {
    checkoutSummary = (
      <CheckoutSummary
        flights={props.bookedFlightsList}
        price={props.totalFlightPrice}
        checkoutCancel={checkoutCancelHandler}
        checkoutContinue={() =>
          console.log("API Call initiates, my program ends here for now...")
        }
      />
    );
  }

  useEffect(() => {
    if (props.bookedFlightsList.length !== 0) {
      setAbleToBook(true);
    } else {
      setAbleToBook(false);
    }
  }, [props.bookedFlightsList]);

  return (
    <React.Fragment>
      <div className={classes.FlightBooking}>
        <h1>{labels.TITLE_1}</h1>
        <h4>{messages.WELCOME_MESSAGE}</h4>
        <hr />
        <h2>{labels.AVAIL_FLIGHTS}</h2>
        {availableFlights}
      </div>
      <div className={classes.FlightBooking}>
        <h2>{labels.CART}</h2>
        {yourFlights}
        <Button
          btnType="Success"
          disabled={!ableToBook}
          clicked={checkoutHandler}
        >
          {labels.BOOK_BUTTON}
        </Button>
      </div>
      <Modal show={checkingOut} modalClosed={checkoutCancelHandler}>
        {checkoutSummary}
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  availableFlightsList: state.flightReducer.availableFlights,
  bookedFlightsList: state.flightReducer.bookedFlights,
  totalFlightPrice: state.flightReducer.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  bookFlt: (flt) => dispatch(bookFlight(flt)),
  cancelFlt: (flt) => dispatch(cancelFlight(flt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightBooking);
