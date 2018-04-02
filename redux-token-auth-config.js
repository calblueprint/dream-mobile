import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from './constants'

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    dreamId: 'dream_id',
    email: 'email',
    phone: 'phone',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    dreamId: 'dream_id',
    email: 'email',
    phone: 'phone',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
