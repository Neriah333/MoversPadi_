const express = require('express');

const { register, approve, companies } = require('../controllers/companyController');
const router = express.Router();

router.post('/register-company', register);
router.post('/approve-company/:id', approve);
router.get('/companies', companies);

module.exports = router;