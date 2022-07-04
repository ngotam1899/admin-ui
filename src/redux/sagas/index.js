import { all } from "redux-saga/effects";

import auth from "./auth";
import personalityGroup from "./personalityGroup";

export default function* rootSaga(getState) {
  yield all([
    auth(), personalityGroup(),
  ]);
}
