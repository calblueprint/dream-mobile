// TODO (Kelsey): test whether if check actually works
if (process.env.NODE_ENV === 'production') {
  URL = 'https://dream-rails-production.herokuapp.com';
} else {
  URL = 'http://10.142.150.154:3000';
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
};

export default settings;
