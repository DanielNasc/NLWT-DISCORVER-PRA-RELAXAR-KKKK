const {Router} = require('express')
const routes = Router()
const questionController = require('./controllers/questionController')
const RoomController = require('./controllers/roomController')

//GET
routes.get('/', (req, res)=>{res.render('index', {page: 'enter-room'})})
routes.get('/create-pass', (req, res)=>{res.render('index', {page: 'create-pass'})})
routes.get('/room/:roomid', (req, res)=>{res.render('room')})

//POST
routes.post('/question/:room/:question/:action', questionController.index)
routes.post('/create', RoomController.create)

module.exports = routes