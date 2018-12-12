import { createMuiTheme } from '@material-ui/core/styles'
// find full object data here: https://material-ui.com/customization/default-theme/

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#36AB91',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fff',
    },
    secondary: {
      main: '#F58317',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    // error: will use the default color
  },
  typography: {
    display4: {
      fontSize: '4rem',
    },
  },
})

export default theme
