import { Alert } from 'react-native'

/**
 * Display error in pop-up dialog with custom buttons.
 */
function customError(response, buttonActions) {
  Alert.alert(
    'Error',
    response.errors.join("\n"),
    buttonActions,
  )
}

/**
 * Display error in pop-up dialog with OK button.
 */
function standardError(response) {
  Alert.alert(
    'Error',
    response.errors.join("\n"),
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
  )
}

export { customError, standardError }
