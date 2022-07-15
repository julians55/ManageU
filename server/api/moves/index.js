const { Router } = require('express');
const {
    getMoves,
    getMoveById,
    createMove
} = require('./moves.controller');
const {isAuth} = require('../../auth/auth.service');

const router = Router();

router.get('/',isAuth(), getMoves);
router.get('/:id', getMoveById)
router.post('/',isAuth(), createMove)

module.exports = router;