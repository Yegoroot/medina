import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReduces, { moduleName as authModule } from "../ducks/auth";
import authReduces2, { moduleName as authModule2 } from "../ducks/auth2";
import history from "../common/history";
import projectsReducer, {
  moduleName as projectsModule
} from "../ducks/projects";
import usersReducer, { moduleName as usersModule } from "../ducks/users";

export default combineReducers({
  router: connectRouter(history),
  [authModule]: authReduces,
  [authModule2]: authReduces2,
  [projectsModule]: projectsReducer,
  [usersModule]: usersReducer
});
