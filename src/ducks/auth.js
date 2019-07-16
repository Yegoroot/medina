import { put, takeEvery } from "redux-saga/effects";
import { appName } from "../common/config";

// import { push } from "connected-react-router";
import { delay } from "redux-saga/effects";

const initState = {
  isLoading: true,
  user: null
};

// CONSTANTS
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;
export const SIGN = `${prefix}/SIGN`;
export const SIGN_REQUEST = `${prefix}/SIGN_REQUEST`;

// REDUCER
export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_REQUEST:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      });
    case SIGN:
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
export function signRequest(person) {
  return {
    type: SIGN_REQUEST,
    payload: person
  };
}

// SAGAS
export const signRequestSaga = function*(action) {
  let { payload } = action;
  // если данные переданы то их, иначе null
  let user = payload ? { ...action.payload } : null;

  yield delay(1200);
  yield put({
    type: SIGN,
    payload: user
  });
  // yield put(push("/list"));
};

// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
  yield takeEvery(SIGN_REQUEST, signRequestSaga); // слушаем события экшена ADD_PERSON_REQUEST и передаем их саге addPersonSaga
};
