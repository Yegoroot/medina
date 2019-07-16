import { appName } from "common/config";
import { takeEvery, put } from "redux-saga/effects";

/**
 * CONSTANTS
 **/
export const moduleName = "users";
const prefix = `${appName}/${moduleName}`;

export const SET_USER_REQUSET = `${prefix}/SET_USER_REQUSET`;
export const SET_USER = `${prefix}/SET_USER`;

/**
 * REDUCER
 **/
const initState = {
  isLoading: false,
  users: []
};

export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_REQUSET:
      return {
        ...state,
        isLoading: true
      };
    case SET_USER:
      return {
        ...state,
        users: [...state.users, payload],
        isLoading: false
      };

    default:
      return state;
  }
}

/**
 * ACTION CREATORS
 **/
export function addUser(payload) {
  return {
    type: SET_USER_REQUSET,
    payload
  };
}

/**
 * SAGAS
 **/

export const addUserSaga = function*(action) {
  // const projectList = yield call(() => getProjects(action.payload));

  yield put({
    type: SET_USER,
    payload: { ...action.payload }
  });
};

export const saga = function*() {
  yield takeEvery(SET_USER_REQUSET, addUserSaga);
};
