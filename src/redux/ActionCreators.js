import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  },
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 1000);
};

export const dishesLoading = () => {
  console.log("loading");
  return {
    type: ActionTypes.DISHES_LOADING,
  };
};

export const dishesFailed = (errmess) => {
  console.log("fail");
  return {
    type: ActionTypes.DISHES_FAILED,
    payload: errmess,
  };
};

export const addDishes = (dishes) => {
  console.log("add dish");
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
  };
};
