import { appName } from "common/config";
import { takeEvery, put, call } from "redux-saga/effects";
import {
  getUsers as getUsersService,
  getUser as getUserService
} from "../services/user";
import uuid from "uuid/v1";

/**
 * CONSTANTS
 **/
export const moduleName = "users";
const prefix = `${appName}/${moduleName}`;

export const REQUEST_ADD_USER = `${prefix}/REQUEST_ADD_USER`;
export const SUCCESS_ADD_USER = `${prefix}/SUCCESS_ADD_USER`;
export const REQUEST_GET_USERS = `${prefix}/REQUEST_GET_USERS`;
export const SUCCESS_GET_USERS = `${prefix}/SUCCESS_GET_USERS`;
export const REQUEST_GET_USER = `${prefix}/REQUEST_GET_USER`;
export const SUCCESS_GET_USER = `${prefix}/SUCCESS_GET_USER`;
export const HANDLE_MODAL = `${prefix}/HANDLE_MODAL`;

/**
 * REDUCER
 **/
const initState = {
  isLoadingGetUsers: false,
  isLoadingAdd: false,
  isLoadingGetUser: false,
  isOpenModalAddUser: false,
  users: [],
  user: null,
  usersTotal: null
};

export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case HANDLE_MODAL:
      return {
        ...state,
        isOpenModalAddUser: payload
      };
    case REQUEST_ADD_USER:
      return {
        ...state,
        isLoadingAdd: true
      };
    case SUCCESS_ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
        isLoadingAdd: false,
        isOpenModalAddUser: false
      };
    case REQUEST_GET_USER:
      return {
        ...state,
        isLoadingGetUser: true
      };
    case SUCCESS_GET_USER:
      return {
        ...state,
        ...payload,
        isLoadingGetUser: false
      };
    case REQUEST_GET_USERS:
      return {
        ...state,
        isLoadingGetUsers: true
      };
    case SUCCESS_GET_USERS:
      return {
        ...state,
        ...payload,
        isLoadingGetUsers: false
      };

    default:
      return state;
  }
}

/**
 * ACTION CREATORS
 **/

export const handleModalAddUser = payload => ({
  type: HANDLE_MODAL,
  payload
});

export function addUser(payload) {
  return {
    type: REQUEST_ADD_USER,
    payload
  };
}

/**
 * GET LIST USERS
 * @param {filter: obj} payload
 */
export function getUsers(payload) {
  return {
    type: REQUEST_GET_USERS,
    payload
  };
}

/**
 * GET USER
 * @param {ID: string} payload
 */
export function getUser(payload) {
  return {
    type: REQUEST_GET_USER,
    payload
  };
}

/**
 * SAGAS
 **/

export const getUsersSaga = function*(action) {
  const usersData = yield call(() => getUsersService(action.payload));

  yield put({
    type: SUCCESS_GET_USERS,
    payload: usersData
  });
};

export const getUserSaga = function*(action) {
  const uid = action.payload;

  const userData = yield call(() => getUserService(uid));

  yield put({
    type: SUCCESS_GET_USER,
    payload: userData
  });
};

export const addUserSaga = function*(action) {
  // const projectList = yield call(() => getProjects(action.payload));
  /**
   * ПРИЧЕСЫВАЕМ ДАННЫЕ
   */
  let payload = action.payload;
  payload.id = uuid();
  payload.address = {
    country: payload.country,
    city: payload.city
  };
  delete payload.country;
  delete payload.city;
  yield put({
    type: SUCCESS_ADD_USER,
    payload
  });
};

export const saga = function*() {
  yield takeEvery(REQUEST_ADD_USER, addUserSaga);
  yield takeEvery(REQUEST_GET_USERS, getUsersSaga);
  yield takeEvery(REQUEST_GET_USER, getUserSaga);
};
