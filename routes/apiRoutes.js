// dependencies
const path = require('path')
const express = require('express')
const fs = require('fs')
const router = express.Router()

// npm package that allows for unique ids to be created
const { v4: uuidv4 } = require('uuid')

router.get('/api/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '../db/db.json'))
})
router.post('/api/notes', (req, res) => {
	let db = fs.readFileSync('db/db.json')
	db = JSON.parse(db)
	res.json(db)
	// creating body for note
	let userNote = {
		title: req.body.title,
		text: req.body.text,
		// creating unique id for each note
		id: uuidv4(),
	}
	// pushing created note to be written in the db.json file
	db.push(userNote)
	fs.writeFileSync('db/db.json', JSON.stringify(db))
	res.json(db)
})
router.delete('/api/notes/:id', (req, res) => {
	// reading notes form db.json
	let db = JSON.parse(fs.readFileSync('db/db.json'))
	// removing note with id
	let deleteNotes = db.filter((item) => item.id !== req.params.id)
	// Rewriting note to db.json
	fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes))
	res.json(deleteNotes)
})

// routing
module.exports = router
