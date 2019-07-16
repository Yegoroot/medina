import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReduces, { moduleName as authModule } from "../ducks/auth";
import history from "../common/history";
import projectsReducer, {
  moduleName as projectsModule
} from "../ducks/projects";
import usersReducer, { moduleName as usersModule } from "../ducks/users";

export default combineReducers({
  router: connectRouter(history),
  [authModule]: authReduces,
  [projectsModule]: projectsReducer,
  [usersModule]: usersReducer
});
