import { appName } from "common/config";
import { takeEvery, put, call } from "redux-saga/effects";

// Shared services
import { getProjects } from "services/project";

/**
 * CONSTANTS
 **/
export const moduleName = "projects";
const prefix = `${appName}/${moduleName}`;

export const REQUSET_GET_PROJECTS = `${prefix}/REQUSET_GET_PROJECTS`;
export const GET_PROJECTS = `${prefix}/GET_PROJECTS`;

/**
 * REDUCER
 **/
const initState = {
  isLoading: false,
  projects: [],
  projectsTotal: 0
};

export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUSET_GET_PROJECTS:
      return Object.assign({}, state, {
        ...state,
        isLoading: true
      });
    case GET_PROJECTS:
      return Object.assign({}, state, {
        ...state,
        ...payload,
        isLoading: false
      });

    default:
      return state;
  }
}

/**
 * ACTION CREATORS
 **/
export function getProjectList(payload) {
  return {
    type: REQUSET_GET_PROJECTS,
    payload
  };
}

/**
 * SAGAS
 **/

export const getProjectListSaga = function*(action) {
  const projectList = yield call(() => getProjects(action.payload));

  yield put({
    type: GET_PROJECTS,
    payload: projectList
  });
};

export const saga = function*() {
  yield takeEvery(REQUSET_GET_PROJECTS, getProjectListSaga);
};
