import { put, takeEvery, call, cps, take, all } from "redux-saga/effects";
import { appName } from "../common/config";
/**
 * cps работаем с callback в нодовском стиле (то есть первое обработка ошибок)
 * call расчитывает на то что на выходе будет promise и он подождет выполнение этого promise
 * takeLatest чтоб не дублировать, берем только последний запрос, старые (action, effect) отменяем
 */

// FIREBASE
import firebase from "firebase/app";
import "firebase/auth";

const initState = {
  profile: null,
  error: null,
  isLoading: false
};

// CONSTANTs
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;

export const SIGN_IN_SOCIAL_REQUEST = `${prefix}/SIGN_IN_SOCIAL_REQUEST`;
export const SIGN_IN_SOCIAL_SUCCESS = `${prefix}/SIGN_IN_SOCIAL_SUCCESS`;
export const SIGN_IN_SOCIAL_ERROR = `${prefix}/SIGN_IN_SOCIAL_ERROR`;

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`;

// REDUCER
export default function reducer(state = initState, action) {
  const { type, payload, error } = action;

  switch (type) {
    // SIGN UP
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    // SIGN IN
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload
      };

    case SIGN_IN_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      };

    // SOCIAL
    case SIGN_IN_SOCIAL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SIGN_IN_SOCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload
      };

    case SIGN_IN_SOCIAL_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      };

    // OUT
    case SIGN_OUT_SUCCESS:
      return {
        profile: null,
        error: null,
        isLoading: false
      };

    case SIGN_OUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      };

    default:
      return state;
  }
}

// ACTIONS
export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {
      email,
      password
    }
  };
}

// CREATE createUserWithEmailAndPassword

export const signUpSaga = function*(action) {
  const auth = firebase.auth();

  try {
    const profile = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    );
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: profile
    });
    // yield put(reset("authSignUp"));
  } catch (error) {
    alert("Ошибка, next SIGN_UP_ERROR");
    yield put({
      type: SIGN_UP_ERROR,
      error
    });
  }
};

// SIGN IN
export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: {
      email,
      password
    }
  };
}

/**
 * // SIGNIN signInWithEmailAndPassword
 * НА ВСЯКИЙ СЛУЧАЙ ДРУГИМ СПОСОБОМ (не takeEvery)
 * take даёт больше контроля - например он может сделать несколько проверок
 */

export const signInSaga = function*() {
  const auth = firebase.auth();

  while (true) {
    const action = yield take(SIGN_IN_REQUEST);

    try {
      const profile = yield call(
        [auth, auth.signInWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      );
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: profile
      });
    } catch (error) {
      alert(error.message);
      yield put({
        type: SIGN_IN_ERROR,
        error
      });
    }
  }
};

// SIGN IN WITH SOCIAL
// ACTIONS
export function signInSocial(person) {
  return {
    type: SIGN_IN_SOCIAL_REQUEST,
    payload: person
  };
}

// SAGAS
export const signInSocialSaga = function*(action) {
  let { payload } = action;
  // если данные переданы то их, иначе null
  let profile = payload ? { ...action.payload } : null;

  yield put({
    type: SIGN_IN_SOCIAL_SUCCESS,
    payload: profile
  });
};

// SIGN OUT
// ACTIONS
export function signOut() {
  return {
    type: SIGN_OUT_REQUEST
  };
}

// SAGAS
export const signOutSaga = function*() {
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS
    });
    // yield put(push("/sign-in"));
  } catch (error) {
    yield put({
      type: SIGN_OUT_ERROR,
      error
    });
  }
};

// ПРОВЕРЯЕМ АВТОРИЗОВАН ЛИ ПОЛЬЗОВАТЕЛЬ
export const watchStatusChange = function*() {
  let auth = firebase.auth();
  try {
    // в node овском стиле первым аргументом идет ошибка а не данные
    yield cps([auth, auth.onAuthStateChanged]);
  } catch (data) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: data
    });
  }
};

// ГЛАВНАЯ НАША SAGA
export const saga = function*() {
  yield all([
    takeEvery(SIGN_UP_REQUEST, signUpSaga), // тут (signUpSaga) мне реагируем на все action (можно логирование)
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
    signInSaga(), // пошли другим путём
    takeEvery(SIGN_IN_SOCIAL_REQUEST, signInSocialSaga),
    watchStatusChange()
  ]);
};
