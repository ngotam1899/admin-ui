import { combineReducers } from 'redux'

import answer from './answer'
import auth from './auth'
import college from './college'
import major from './major'
import personalityGroup from './personalityGroup'
import question from './question'
import test from './test'
import state from "./state";
import ui from "./ui";
import user from './user'

export default combineReducers({
  answer,
  auth,
  college,
  major,
  personalityGroup,
  question,
  test,
  state,
  ui,
  user,
})
