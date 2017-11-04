// TODO (Kelsey): test whether if check actually works
if (process.env.NODE_ENV === 'production') {
  URL = 'https://dream-rails-production.herokuapp.com';
} else {
  URL = 'http://100.64.7.143:3000';
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
};

export default settings;
