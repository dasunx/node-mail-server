const express = require('express');
const { sendInvitation } = require('../controllers/invitation-controller');
const router = express.Router();

router.post('/', sendInvitation);

module.exports = router;
