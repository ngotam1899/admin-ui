import { all } from 'redux-saga/effects'

import answer from './answer'
import auth from './auth'
import college from './college'
import personalityGroup from './personalityGroup'
import question from './question'
import test from './test'
import user from './user'

export default function* rootSaga(getState) {
  yield all([answer(), auth(), college(), personalityGroup(), question(), test(), user()])
}
