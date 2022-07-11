import { combineReducers } from 'redux'

import auth from './auth'
import personalityGroup from './personalityGroup'
import question from './question'
import test from './test'
import user from './user'

export default combineReducers({
  auth,
  personalityGroup,
  question,
  test,
  user,
})
