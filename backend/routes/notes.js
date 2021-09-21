const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, checkSchema, validationResult } = require('express-validator');
const Notes = require('../models/Note'); //Importing notes model here

// ROUTE 1 : Get all the notes : using GET "/api/notes/fetchAllNotes" . Login required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
        // res.json sends object and res.send sends plain text
        // res.send(notes);
    } catch (error) {
        console.log(error.message, '---------->>>>>>Error from notes.js file --- fetchAllNotes api');
        res.status(500).send('Internal server error');
    }
});

// ROUTE 2 : Add a new note : using POST "/api/notes/addNote" . Login required
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log(error.message, '---------->>>>>>Error from notes.js file --- addNote api');
            res.status(500).send('Internal server error');
        }
    });

// ROUTE 3 : Update an existing note : using PUT "/api/notes/updateNote" . Login required
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a new note object

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be update it and update it.

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send('not found')
        }

        if (note.user.toString() !== req.user.id) {
            // note.user.toString will give us ID which is saved in db
            return res.status(401).send('Not allowed');
        }

        // $set will update the data
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        // new:true means if any new contact comes then it will be updated

        res.json(note);
        // const note = new Notes({
        //     title, description, tag, user: req.user.id
        // });
        // const savedNote = await note.save();
        // res.json(savedNote);
    } catch (error) {
        console.log(error.message, '---------->>>>>>Error from notes.js file --- update note  api');
        res.status(500).send('Internal server error');
    }
});

module.exports = router;