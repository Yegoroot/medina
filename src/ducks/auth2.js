import {
  // put,
  takeEvery
} from "redux-saga/effects";
import { appName } from "../common/config";

// FIREBASE
import firebase from "firebase/app";
import "firebase/auth";

const initState = {
  user: null,
  error: null,
  isLoading: false
};

// CONSTANTs
export const moduleName = "auth2";
const prefix = `${appName}/${moduleName}`;
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

// REDUCER
export default function reducer(state = initState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      };

    default:
      return state;
  }
}

// ACTIONS
export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {
      email,
      password
    }
  };
}

// SAGAS
export const signUpRequestSaga = function*(action) {
  let { email, password } = action.payload;
  console.log("signUpRequestSaga run");
  yield firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      // console.log("User", user);
      // put({
      //   type: SIGN_IN_SUCCESS,
      //   payload: user
      // });
    });
};

// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
  yield takeEvery(SIGN_UP_REQUEST, signUpRequestSaga); // слушаем события экшена ADD_PERSON_REQUEST и передаем их саге addPersonSaga
};
