const {Router} = require('express')
const routes = Router()
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')
const RoomController = require('./controllers/roomController')

//GET================================================================================

routes.get('/', (req, res)=>{res.render('index', {page: 'enter-room'})})
routes.get('/create-pass', (req, res)=>{res.render('index', {page: 'create-pass'})})
routes.get('/room/:roomid', RoomController.open)

//POST================================================================================

routes.post('/enter', roomController.enter)
routes.post('/question/:room/:question/:action', questionController.index)
routes.post('/create', RoomController.create)
routes.post('/question/create/:room/', questionController.create)

module.exports = routes