const express = require('express');
const router = express.Router();

//Route for Index ('/') GET-request 
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
