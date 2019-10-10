import { appName } from "common/config";
import { takeEvery, put, call, select } from "redux-saga/effects";

// Shared services
import { getProjects } from "services/project";

/**
 * CONSTANTS
 **/
export const moduleName = "projects";
const prefix = `${appName}/${moduleName}`;

export const REQUSET_GET_PROJECTS = `${prefix}/REQUSET_GET_PROJECTS`;
export const SUCCESS_GET_PROJECT = `${prefix}/SUCCESS_GET_PROJECT`;
export const ERROR_GET_PROJECT = `${prefix}/ERROR_GET_PROJECT`;

/**
 * REDUCER
 **/
const initState = {
  isLoading: true,
  projects: [],
  projectsTotal: 0,
  error: null
};

export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUSET_GET_PROJECTS:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      });
    case SUCCESS_GET_PROJECT:
      return Object.assign({}, state, {
        ...state,
        ...payload,
        isLoading: false,
        error: null
      });

    case ERROR_GET_PROJECT:
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        error: payload
      });

    default:
      return state;
  }
}

/**
 * ACTION CREATORS
 **/
export function getProjectList() {
  return {
    type: REQUSET_GET_PROJECTS
  };
}

/**
 * SAGAS
 **/

export const getProjectListSaga = function*(action) {
  /** if state.projects exist in redux then dont need make request for data */
  const projects = yield select(state => state.projects.projects);

  if (projects.length) {
    yield put({ type: SUCCESS_GET_PROJECT });
    return;
  }

  try {
    const projectList = yield call(() => getProjects(action.payload));

    yield put({
      type: SUCCESS_GET_PROJECT,
      payload: projectList
    });
  } catch (e) {
    yield put({
      type: ERROR_GET_PROJECT,
      payload: e
    });
  }
};

export const saga = function*() {
  yield takeEvery(REQUSET_GET_PROJECTS, getProjectListSaga);
};
