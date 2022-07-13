const { Router } = require('express');
const {
    getUsers
} = require('./user.controller');

const router = Router();

router.get('/', getUsers);

module.exports = router;