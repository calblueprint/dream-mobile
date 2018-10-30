import { Platform } from 'react-native'

/**
 * Determines URL based on whether in production or dev environment
 */
 // TODO (Kelsey): test whether if check actually works
if (process.env.NODE_ENV === 'production') {
  console.log('production');
  URL = 'https://dream-rails-herokoconnect.herokuapp.com'
  // URL = 'https://dream-rails-staging.herokuapp.com';
  // URL = 'https://dream-rails-production.herokuapp.com';
  ALT_URL = URL;

} else {
  console.log('staging');
  URL = Platform.select({
    ios: "http://074f7bf8.ngrok.io",
    // For Android Emulator
    android: "http://10.0.2.2:3000"
  });
  ALT_URL = URL + "1";
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
  ALT_URL,
};

export default settings;
