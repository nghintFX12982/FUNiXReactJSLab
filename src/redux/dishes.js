import * as ActionTypes from "./ActionTypes";

let count = 0;

export const Dishes = (
  state = {
    isLoading: true,
    errMess: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      console.log("Case 1: add dish action");
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };

    case ActionTypes.DISHES_LOADING:
      console.log("Case 2: dish loading action");
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    case ActionTypes.DISHES_FAILED:
      console.log("Case 3: dish failed action");
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [],
      };

    default:
      count += 1;
      console.log(count);
      console.log("default case: no action");
      return state;
  }
};
