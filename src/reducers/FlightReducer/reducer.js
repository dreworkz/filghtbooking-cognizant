import { BOOK_FLIGHT, CANCEL_FLIGHT } from "./actions";
import { flightInfo } from "../../constants/FlightInfo";

// intialstate
const intialState = {
  availableFlights: [...flightInfo],
  bookedFlights: [],
  totalPrice: 0.0,
};

//reducer
const flightReducer = (state = intialState, action) => {
  switch (action.type) {
    case BOOK_FLIGHT:
      return {
        bookedFlights: [...state.bookedFlights, action.payload],
        availableFlights: [
          ...state.availableFlights.filter(
            (target) => target !== action.payload
          ),
        ],
        totalPrice: (state.totalPrice += action.payload.price),
      };
    case CANCEL_FLIGHT:
      return {
        bookedFlights: [
          ...state.bookedFlights.filter((target) => target !== action.payload),
        ],
        availableFlights: [...state.availableFlights, action.payload],
        totalPrice: (state.totalPrice -= action.payload.price),
      };
    default:
      return state;
  }
};

export default flightReducer;
