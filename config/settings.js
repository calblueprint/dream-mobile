if (process.env.NODE_ENV === 'production') {
  URL = 'https://dream-rails-production.herokuapp.com';
} else {
  URL = 'https://localhost:3000';
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
};

export default settings;