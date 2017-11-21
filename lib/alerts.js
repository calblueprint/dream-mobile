import { Alert } from 'react-native'

/**
 * Display error in pop-up dialog with custom buttons.
 * Error callback for API requests.
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
 * Error callback for API requests.
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

/**
 * Display error in pop-up dialog with OK button.
 * Error alert for frontend errors.
 */
function frontendError(message) {
  Alert.alert(
    'Error',
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
  )
}

export { customError, standardError, frontendError }
