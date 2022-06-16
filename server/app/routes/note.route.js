const jwt = require('jsonwebtoken')
module.exports = (app) => {
    
    // controller will contain methods for handling all the CRUD operations
    
    const notes = require('../controllers/note.controllers.js') 

accessTokenSecret ="thisisthefirsttokenthatigenerated"
    const authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, accessTokenSecret, (err, note) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.note = note;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };
// create a new note

app.post('/notes', notes.create)

// Retrieve all notes

app.get('/notes', authenticateJWT, notes.findAll)

// Retrieve a single note with userId

app.get('/notes/:noteId',authenticateJWT, notes.findone)

// Update a note with userId

app.put('/notes/:noteId', notes.update)

// Delete a note with userId

app.delete('/notes/:noteId', notes.delete)
}
