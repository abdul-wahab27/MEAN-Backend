const req = require('express/lib/request');
const Note = require('../models/note.model.js')

// Create and Save a new Note

exports.create = (req,res) => {
    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    // Create a note    
    const note = new Note({
        title: req.body.title , 
        content: req.body.content
    });

    // Save a note in Database
    note.save()
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error occured while creating the note"
        });
    });
};

// Retrieve and return all notes from database

exports.findAll = (req,res) =>{
    Note.find()
    .then(notes =>{
        res.send(notes)
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Error Occur while retrieving the note"
        })
    })
};

// Find a single note with noteId

exports.findone = (req,res) =>{
    Note.findById(req.params.noteId)
    .then(note =>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send(note)
    })
    .catch(err =>{
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                message: "Note not found with id" + req.params.noteId
            })
        }
        return res.status(500).send({
            message: "Error retrieving note with id" + req.params.noteId
        })
    })
    

};

// Update a note identified by the noteId in the request 

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title ,
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with specified noteId in the request

exports.delete = (req,res) =>{

    Note.findByIdAndRemove(req.params.noteId)
    .then(note =>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id" + req.params.noteId
            })
        }
        res.send({message: "Note deleted successfully"})
    })
    .catch(err =>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound')
        res.status(404).send({
            message: "Note not found with id" + req.params.noteId
        })
        return res.status(500).send({
            message: "Could not delete note with id" + req.params.noteId
        });
    });
}