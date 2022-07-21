const { Router } = require('express');
const {
    getMoves,
    getLastMoves,
    getMoveById,
    createMove,
    getMovesByUser,
    editMove,
    deleteMove
} = require('./moves.controller');
const {isAuth} = require('../../auth/auth.service');

const router = Router();

router.get('/',isAuth(), getMoves);
router.get('/last',isAuth(), getLastMoves);
router.get('/:id', getMoveById);
router.get('/user/:id', getMovesByUser);
router.post('/',isAuth(), createMove);
router.post('/:id',isAuth(), editMove);
router.delete('/:id',isAuth(),deleteMove);

module.exports = router;