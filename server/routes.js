const user = require('./api/user');
const auth = require('./auth/local');
function routes(app){
    app.use('/api/user', user);
    app.use('/auth/local', auth);
}

module.exports = routes;