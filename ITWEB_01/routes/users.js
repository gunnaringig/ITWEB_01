const express = require('express');
const router = express.Router();

// Index ('/') GET-request
router.get('/users', (req, res) => {
    res.render('users');
});

module.exports = router;
