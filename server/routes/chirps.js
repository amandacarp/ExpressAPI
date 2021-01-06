const express = require('express');
let router = express.Router();
const chirpStore = require('../chirpstore')

router.get('/', (req, res) => {
    res.send('chirps');
} );

module.exports = router;