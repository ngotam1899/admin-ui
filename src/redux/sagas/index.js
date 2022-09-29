import { all } from 'redux-saga/effects'

import answer from './answer'
import auth from './auth'
import blog from './blog'
import college from './college'
import major from './major'
import personalityGroup from './personalityGroup'
import question from './question'
import subjectGroup from './subjectGroup'
import test from './test'
import user from './user'

export default function* rootSaga(getState) {
  yield all([
    answer(),
    auth(),
    blog(),
    college(),
    major(),
    personalityGroup(),
    question(),
    subjectGroup(),
    test(),
    user(),
  ])
}
