import { spacing, getMuiTheme } from 'material-ui/styles'
import {
  cyan500,
  cyan700,
  grey400,
  grey100,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack,
} from 'material-ui/styles/colors'

const primaryColor = '#005c95'
const lightColor = '#4d89c6'
const darkColor = '#003367'
const disabledColor = 'rgba(0, 0, 0, 0.3)'

const materialUiTheme = {
  ...spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    // new theme
    primary1Color: primaryColor,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: lightColor,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: primaryColor,
    pickerHeaderColor: cyan500,
    clockCircleColor: 'rgba(0, 0, 0, 0.07)',
    shadowColor: fullBlack,
  },
  snackbar: {
    textColor: '#fff',
    backgroundColor: darkColor,
  },
  flatButton: {
    textColor: primaryColor,
    primaryTextColor: primaryColor,
    secondaryTextColor: lightColor,
  },
  raisedButton: {
    primaryColor,
    secondaryColor: white,
    secondaryTextColor: primaryColor,
    disabledColor,
  },
  tableRow: {
    selectedColor: lightColor,
  },
  textField: {
    hintColor: disabledColor,
  },
  avatar: {
    color: primaryColor,
    backgroundColor: white,
  },
  listItem: {
    leftIconColor: lightColor,
  },
}

// Theme must be wrapped in funciton getMuiTheme
export default getMuiTheme(materialUiTheme)
