import { saga as authSaga } from "../ducks/auth";

// import { saga as locationSaga } from "../ducks/location";
import { saga as usersSaga } from "../ducks/users";
import { saga as projectsSaga } from "../ducks/projects";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([projectsSaga(), authSaga(), usersSaga()]);
}
