import { put, takeEvery } from "redux-saga/effects";
import { appName } from "../common/config";
import { delay } from "redux-saga/effects";

// FIREBASE
import firebase from "firebase/app";
import "firebase/auth";

const initState = {
  isLoading: true,
  user: null
};

// CONSTANTs
export const moduleName = "auth2";
const prefix = `${appName}/${moduleName}`;
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

// REDUCER
export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      });
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        user: payload
      });

    default:
      return state;
  }
}

// ACTIONS
export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST
    // payload: person
  };
}

// SAGAS
export const signUpRequestSaga = function*(action) {
  let { payload } = action;
  let user = payload ? { ...action.payload } : null;

  yield delay(1200);
  yield put({
    type: SIGN_UP_SUCCESS,
    payload: user
  });
};

// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
  yield takeEvery(SIGN_UP_REQUEST, signUpRequestSaga); // слушаем события экшена ADD_PERSON_REQUEST и передаем их саге addPersonSaga
};
