require('dotenv').config();
const express = require('express');
const http = require('http');
const configExpress = require('./config/express');
const routes = require('./routes');

const app = express();

const server = http.Server(app);

configExpress(app);
routes(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('ManageU API')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })