const env = process.env.NODE_ENV || 'development';
const config = require('./config');

module.exports = config[env];
