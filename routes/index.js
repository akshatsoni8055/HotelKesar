var express = require('express');
var router = express.Router()
var admin = require('./api/admin')

router.get('/', (req, res) => {
    res.render('index', { title: "Ledger" })
})

module.exports = { admin, index: router };
