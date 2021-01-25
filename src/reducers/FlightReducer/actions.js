// action types
export const BOOK_FLIGHT = "BOOK_FLIGHT";
export const CANCEL_FLIGHT = "CANCEL_FLIGHT";

// actions
export const bookFlight = (flt) => (dispatch) => {
  dispatch({
    type: BOOK_FLIGHT,
    payload: flt,
  });
};

export const cancelFlight = (flt) => (dispatch) => {
  dispatch({
    type: CANCEL_FLIGHT,
    payload: flt,
  });
};
