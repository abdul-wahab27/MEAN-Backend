module.exports = (app) =>{
    const usersList = require('../controllers/login.controllers')

    app.post('/login', usersList.create_a_login)
    app.get('/userslogin', usersList.findAll)
}



