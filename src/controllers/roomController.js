const Database = require('../db/config')

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password

        let isRoom = true
        let roomId

        while (isRoom) {

            //GERAR ID
            for(var i = 0; i < 6; i++){
                const randomNumber = Math.floor(Math.random() * 10).toString()

                i == 0? roomId = randomNumber:
                roomId += randomNumber
            }

            //CHECAR SE ID EXISTE    
            const roomsIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsIds.some(r => r === roomId)
            
            //INSERIR NO BANCO DE DADOS
            if(!isRoom){
                await db.run(`INSERT INTO rooms (id, pass) VALUES (${Number(roomId)},"${pass}")`)
            }

        }
     

        await db.close()

        return res.redirect(`/room/${roomId}`)
    },
    async open(req, res){
        const roomId = req.params.roomid
        
        const db = await Database()

        let isQuestions = true
        
        const questions = await db.all(` SELECT * FROM questions WHERE room = ${roomId} and readed = 0`)
        const readedQuestions = await db.all(` SELECT * FROM questions WHERE room = ${roomId} and readed = 1`)

        if(questions.length == 0 && readedQuestions.length == 0){
            isQuestions = false
        }

        res.render('room', {roomId, questions, readedQuestions, isQuestions})
    },
    enter(req, res){
        const id = req.body.roomId

        return res.redirect(`/room/${id}`)
    }
}