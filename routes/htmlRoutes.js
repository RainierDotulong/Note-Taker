// dependencies
const path = require('path')
const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// GET * should return the index.html file.
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})
module.exports = router
