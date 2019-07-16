import { put, takeEvery, call, cps, all, take } from "redux-saga/effects";
import { appName } from "../common/config";
// import { push } from "connected-react-router";

// FIREBASE
import firebase from "firebase/app";
import "firebase/auth";

const initState = {
  profile: null,
  error: null,
  isLoading: false
};

// CONSTANTs
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`;

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

    case SIGN_IN_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      };

    case SIGN_OUT_SUCCESS:
      return {
        profile: null,
        error: null,
        isLoading: false
      };

    case SIGN_OUT_ERROR:
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
export const signUpSaga = function*() {
  const action = yield take(SIGN_UP_REQUEST);
  const auth = firebase.auth();

  try {
    const profile = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    );
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: profile
    });
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error
    });
  }
};

// firebase.auth().onAuthStateChanged(profile => {
//   console.log("firebase.auth().onAuthStateChanged USER - ", profile);
// });

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
  let profile = payload ? { ...action.payload } : null;

  yield put({
    type: SIGN_IN_SUCCESS,
    payload: profile
  });
};

export function signOut() {
  return {
    type: SIGN_OUT_REQUEST
  };
}

export const signOutSaga = function*() {
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS
    });
    // yield put(push("/sign-in"));
  } catch (error) {
    yield put({
      type: SIGN_OUT_ERROR,
      error
    });
  }
};

export const watchStatusChange = function*() {
  const auth = firebase.auth();

  try {
    // в node овском стиле первым аргументом идет ошибка а не данные
    yield cps([auth, auth.onAuthStateChanged]);
  } catch (profile) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { profile }
    });
  }
};

// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
  yield all([
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    signUpSaga(), // тут (signUpSaga) мне реагируем на все action (можно логирование)
    takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    // watchStatusChange()
  ]);
};
