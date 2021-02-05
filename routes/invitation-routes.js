const express = require('express');
const { contact } = require('../controllers/contact-controller');
const { sendInvitation } = require('../controllers/invitation-controller');
const router = express.Router();

router.post('/', sendInvitation);
router.post('/contact', contact);
module.exports = router;
