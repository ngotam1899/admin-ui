import { combineReducers } from 'redux'

import answer from './answer'
import auth from './auth'
import blog from './blog'
import college from './college'
import major from './major'
import personalityGroup from './personalityGroup'
import question from './question'
import test from './test'
import state from './state'
import subjectGroup from './subjectGroup'
import ui from './ui'
import user from './user'

export default combineReducers({
  answer,
  auth,
  blog,
  college,
  major,
  personalityGroup,
  question,
  test,
  state,
  subjectGroup,
  ui,
  user,
})
