/**
 * Determines URL based on whether in production or dev environment
 */
 // TODO (Kelsey): test whether if check actually works
if (process.env.NODE_ENV === 'production') {
  URL = 'https://dream-rails-production.herokuapp.com';
} else {
  URL = 'http://localhost:3000';
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
};

export default settings;
