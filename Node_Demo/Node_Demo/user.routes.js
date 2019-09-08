module.exports = (app)=>{
    const users = require('./user.controller.js');


app.post('/users', users.create);

app.get('/users', users.findAll);

app.get('/user/:userId', users.findOne);

app.put('/users/:userId', users.update);

app.delete('/users/:userId', users.delete);

}
