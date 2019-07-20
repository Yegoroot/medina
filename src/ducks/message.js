/**
 *
 *  YOU CAN ADDED SAGA AND REDUCE LATEST REQUEST
 */
import { appName } from "../common/config";

const initState = {
  open: false,
  message: "",
  variant: "info", // ['success', 'warning', 'error', 'info']
  position: {
    vertical: "bottom",
    horizontal: "left"
  }
};

// CONSTANTs
export const moduleName = "message";
const prefix = `${appName}/${moduleName}`;
export const SHOW = `${prefix}/SHOW`;
export const CLEAR = `${prefix}/CLEAR`;

// REDUCER
export default function reducer(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW:
      return {
        open: true,
        ...payload
      };

    case CLEAR:
      return initState;

    default:
      return state;
  }
}

// ACTIONS
export function messageShow(payload) {
  return {
    type: SHOW,
    payload
  };
}
export function messageClear() {
  return {
    type: CLEAR
  };
}
