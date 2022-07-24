import { combineReducers } from 'redux'

import answer from './answer'
import auth from './auth'
import college from './college'
import personalityGroup from './personalityGroup'
import question from './question'
import test from './test'
import user from './user'

export default combineReducers({
  answer,
  auth,
  college,
  personalityGroup,
  question,
  test,
  user,
})
