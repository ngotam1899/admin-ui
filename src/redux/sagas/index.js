import { all } from "redux-saga/effects";

import personalityGroup from "./personalityGroup";

export default function* rootSaga(getState) {
  yield all([
    personalityGroup(),
  ]);
}
