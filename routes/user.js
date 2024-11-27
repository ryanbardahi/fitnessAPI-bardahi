const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/user');
const { authenticate } = require('../auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/details', authenticate, getUserDetails); // New route for user details

module.exports = router;