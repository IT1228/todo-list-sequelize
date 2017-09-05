const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models');
const sequelize = require('sequelize');

const application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

var todos = [];

application.use(bodyParser.urlencoded());
application.use(expressValidator());
application.use(express.static('public'))

application.get('/', (request, response)=>{
    models.Todolist.findAll().then(result => {
    var Model = {todos: result}
              response.render('index', Model)
            })
        }   
    );
application.post('/', (request, response) => {
    var task = request.body.task;
    request.checkBody('task', ' Add a todo').notEmpty();
    var errors = request.validationErrors();
    var errors = false;
    if  (errors){
        response.render('index', {todos, errors});
    }
    else {
        var todo = {};
        todo.task = task;
        todo.checked = false;
        models.Todolist.create(todo).then(result =>response.redirect('/'));
        }
    });

application.post('/:id', (request, response)=> {
    models.Todolist.update({
    checked: 'true'},
    { where: {
    id: request.params.id,
        }
    }).then(result=> response.redirect('/')); 
})

application.listen(3000, function() {
    console.log('listening to port 3000');
});



