const user = require('./api/user');

function routes(app){
    app.use('/api/user', user);
}

module.exports = routes;