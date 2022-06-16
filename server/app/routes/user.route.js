module.exports = (app) =>{
    const usersList = require('../controllers/user.controllers')

    app.post('/users', usersList.create)

    app.get('/users', usersList.findAll)

    app.get('/users/:userId', usersList.findone)

    app.delete('/users/:userId', usersList.delete)

    app.put('/users/:userId', usersList.update)
}
