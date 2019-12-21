// Material helpers
import { createMuiTheme } from '@material-ui/core'

import palette from './palette'
import typography from './typography'
import overrides from './overrides'

export default locale => {
  const isAr = locale === 'ar'
  if (isAr) {
    document.querySelector('body').setAttribute('dir', 'rtl')
  } else {
    document.querySelector('body').setAttribute('dir', 'ltr')
  }

  const theme = createMuiTheme({
    palette,
    typography,
    overrides,
    direction: isAr ? 'rtl' : 'ltr',
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  })
  return theme
}
