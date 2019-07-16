import { put, takeEvery, call, all, take } from "redux-saga/effects";
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
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
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
    case SIGN_IN_REQUEST:
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
    // case SIGN_IN_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error
    //   };

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
export const signUpSaga = function*() {
  const action = yield take(SIGN_UP_REQUEST);
  console.log("signUpSaga");
  const auth = firebase.auth();
  const user = yield call(
    [
      auth, // context require for this method
      auth.createUserWithEmailAndPassword
    ],
    action.payload.email,
    action.payload.password
  );
  yield put({
    type: SIGN_IN_SUCCESS,
    payload: user
  });
};

// ----------------------------------------
// ------------------AUTH
// ----------------------------------------

// ACTIONS
export function signIn(person) {
  return {
    type: SIGN_IN_REQUEST,
    payload: person
  };
}

// SAGAS
export const signInSaga = function*(action) {
  let { payload } = action;
  // если данные переданы то их, иначе null
  let user = payload ? { ...action.payload } : null;

  yield put({
    type: SIGN_IN_SUCCESS,
    payload: user
  });
  // yield put(push("/list"));
};

// ----------------------------------------
//  END AUTH
// ----------------------------------------

// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
  yield all([
    signUpSaga(), // тут (signUpSaga) мне реагируем на все action (можно логирование)
    yield takeEvery(SIGN_IN_REQUEST, signInSaga)
  ]);
};
