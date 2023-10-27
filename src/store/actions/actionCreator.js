import {
  BASE_URL,
  DAY_MONDAY_FETCH_SUCCESS,
  DAY_TUESDAY_FETCH_SUCCESS,
  DAY_WEDNESDAY_FETCH_SUCCESS,
  DAY_THURSDAY_FETCH_SUCCESS,
  DAY_FRIDAY_FETCH_SUCCESS,
  DAYS_FETCH_SUCCESS,
  ONE_DAY_FETCH_SUCCESS,
} from "./actionType";

export const daysFetchSuccess = (payload) => {
  return {
    type: DAYS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const dayMondayFetchSuccess = (payload) => {
  return {
    type: DAY_MONDAY_FETCH_SUCCESS,
    payload: payload,
  };
};

export const dayTuesdayFetchSuccess = (payload) => {
  return {
    type: DAY_TUESDAY_FETCH_SUCCESS,
    payload: payload,
  };
};

export const dayWednesdayFetchSuccess = (payload) => {
  return {
    type: DAY_WEDNESDAY_FETCH_SUCCESS,
    payload: payload,
  };
};

export const dayThursdayFetchSuccess = (payload) => {
  return {
    type: DAY_THURSDAY_FETCH_SUCCESS,
    payload: payload,
  };
};

export const dayFridayFetchSuccess = (payload) => {
  return {
    type: DAY_FRIDAY_FETCH_SUCCESS,
    payload: payload,
  };
};

export const oneDayFetchSuccess = (payload) => {
  return {
    type: ONE_DAY_FETCH_SUCCESS,
    payload: payload,
  };
};

export const loginHandler = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      localStorage.setItem("email", email);
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDaysHandler = (email) => {
  return async (dispatch) => {
    try {
      let response = await fetch(BASE_URL + `/schedule?email=${email}`);
      if (!response.ok) throw new Error("upss something wrong");
      let days = await response.json();
      dispatch(daysFetchSuccess(days.data));
    } catch (error) {
      console.log(error, "<<<dari action");
    }
  };
};

export const fetchDayHandler = (email, day) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        BASE_URL + `/schedule?day=${day}&email=${email}`
      );
      if (!response.ok) throw new Error("upss something wrong");
      let oneDay = await response.json();
      switch (day) {
        case "monday":
          dispatch(dayMondayFetchSuccess(oneDay.data));
          break;
        case "tuesday":
          dispatch(dayTuesdayFetchSuccess(oneDay.data));
          break;
        case "wednesday":
          dispatch(dayWednesdayFetchSuccess(oneDay.data));
          break;
        case "thursday":
          dispatch(dayThursdayFetchSuccess(oneDay.data));
          break;
        case "friday":
          dispatch(dayFridayFetchSuccess(oneDay.data));
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error, "<<<dari action");
    }
  };
};

export const fetchOneDayHandler = (email, day) => {
  return async (dispatch) => {
    try {
      let response = await fetch(
        BASE_URL + `/schedule?day=${day}&email=${email}`
      );
      if (!response.ok) throw new Error("upss something wrong");
      let OneDay = await response.json();
      dispatch(oneDayFetchSuccess(OneDay.data));
    } catch (error) {
      console.log(error, "<<<dari action");
    }
  };
};

export const addSchedulHandler = (email, title, day) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/schedule?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ day, title }),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSchedulHandler = (email, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/schedule?id=${id}&email=${email}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateSchedulHandler = (email, id, title) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/schedule?id=${id}&email=${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
