import { saga as authSaga } from "../ducks/auth";
import { saga as authSaga2 } from "../ducks/auth2";
// import { saga as locationSaga } from "../ducks/location";
import { saga as projectsSaga } from "../ducks/projects";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([authSaga(), projectsSaga(), authSaga2()]);
}
