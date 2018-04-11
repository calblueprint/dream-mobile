import { Platform } from 'react-native'

/**
 * Determines URL based on whether in production or dev environment
 */
 // TODO (Kelsey): test whether if check actually works
if (process.env.NODE_ENV === 'production') {
  console.log('production');
  URL = 'https://dream-rails-staging.herokuapp.com';
  ALT_URL = URL;
  // URL = 'https://dream-rails-production.herokuapp.com';

} else {
  console.log('staging');
  URL = Platform.select({
    ios: "http://localhost:3000",
    // For Android Emulator
    android: "http://10.0.2.2:3000"
  });

  // Intended to be an alternate URL that should make requests fail.
  ALT_URL = URL + "1";
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
  ALT_URL,
};

export default settings;
