import {
  // ITEMS_BY_ID_FETCH_SUCCESS,
  DAYS_FETCH_SUCCESS,
  DAY_MONDAY_FETCH_SUCCESS,
  DAY_TUESDAY_FETCH_SUCCESS,
  DAY_WEDNESDAY_FETCH_SUCCESS,
  DAY_THURSDAY_FETCH_SUCCESS,
  DAY_FRIDAY_FETCH_SUCCESS,
  ONE_DAY_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  days: {},
  dataMonday: [],
  dataTuesday: [],
  dataWednesday: [],
  dataThursday: [],
  dataFriday: [],
  oneDay: [],
};

function dayReducer(state = inisialState, action) {
  switch (action.type) {
    case DAYS_FETCH_SUCCESS:
      return {
        ...state,
        days: action.payload,
      };
    case DAY_MONDAY_FETCH_SUCCESS:
      return {
        ...state,
        dataMonday: action.payload,
      };
    case DAY_TUESDAY_FETCH_SUCCESS:
      return {
        ...state,
        dataTuesday: action.payload,
      };
    case DAY_WEDNESDAY_FETCH_SUCCESS:
      return {
        ...state,
        dataWednesday: action.payload,
      };
    case DAY_THURSDAY_FETCH_SUCCESS:
      return {
        ...state,
        dataThursday: action.payload,
      };
    case DAY_FRIDAY_FETCH_SUCCESS:
      return {
        ...state,
        dataFriday: action.payload,
      };
    case ONE_DAY_FETCH_SUCCESS:
      return {
        ...state,
        oneDay: action.payload,
      };
    default:
      return state;
  }
}

export default dayReducer;
