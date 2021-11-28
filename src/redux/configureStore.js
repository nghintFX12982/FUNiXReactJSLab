import { createStore } from "redux";
import { Reducer, initialState } from "./reducer";

export const configureStore = () => {
  const store = createStore(Reducer, initialState);
  console.log(this);
  return store;
};
