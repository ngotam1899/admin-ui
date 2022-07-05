import { combineReducers } from 'redux'

import auth from './auth'
import personalityGroup from './personalityGroup'
import test from './test'

export default combineReducers({
  auth,
  personalityGroup,
  test,
})
