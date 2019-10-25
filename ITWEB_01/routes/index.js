const express = require('express');
const router = express.Router();



// Index ('/') GET-request
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
