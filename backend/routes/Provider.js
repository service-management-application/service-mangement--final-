const express = require('express');
const router = express.Router();
const {registerProvider ,loginProvider} = require('../Controller/loginProvider');
router.post('/register', registerProvider);
router.post('/login', loginProvider);



module.exports = router;
