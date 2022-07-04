import { combineReducers } from "redux";

import auth from "./auth";
import personalityGroup from "./personalityGroup";

export default combineReducers({
  auth, personalityGroup,
});
