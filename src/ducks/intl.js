import { appName } from 'common/config'

/**
 * CONSTANTS
 **/
export const moduleName = 'intl'
const prefix = `${appName}/${moduleName}`

export const CHANGE_LOCALE = `${prefix}/CHANGE_LOCALE`

/**
 * REDUCER
 **/

const initState = {
  locale: 'en', // locale by default
}

export default function reducer(state = initState, action) {
  const { type, payload } = action

  switch (type) {
    case CHANGE_LOCALE:
      return Object.assign(
        {},
        {
          locale: payload,
        }
      )

    default:
      return state
  }
}

/**
 * ACTION CREATORS
 **/
export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  }
}
