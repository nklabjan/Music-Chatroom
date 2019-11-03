const frontend_uri = (process.env.REACT_APP_FRONTEND_URI || 'http://localhost:3000');
const backend_url = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080');

module.exports.frontend_uri = frontend_uri;
module.exports.backend_url = backend_url;

