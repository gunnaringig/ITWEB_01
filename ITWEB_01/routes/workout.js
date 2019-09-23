const express = require('express');
const router = express.Router();



// Index ('/') GET-request
router.get('/workout', (req, res) => {
    res.render('workout');
});

module.exports = router;
