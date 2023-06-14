module.exports = {
  API_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/server-api/'
      : process.env.SERVER_API,
};