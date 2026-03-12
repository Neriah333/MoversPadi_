const express = require('express');

const { register, approve, movers } = require('../controllers/moverController');
const router = express.Router();

router.post('/register-mover', register);
router.post('/approve-mover/:id', approve);
router.get('/movers', movers);

module.exports = router;