const Database = require('../db/config')

module.exports = {
    async index(req, res){
        const db = await Database()
        const roomId = req.params.room
        const question = req.params.question
        const action = req.params.action
        const pass = req.body.password

        const passExist = await db.get(`SELECT * FROM rooms WHERE id = ${roomId} `)

        if(passExist.pass == pass ){
            if(action == 'delete'){
               await db.run(`DELETE FROM questions WHERE id = ${question}`)

            }else if(action == 'check'){

                await db.run(`UPDATE questions SET readed = 1 WHERE id = ${question}`)

            }
            await db.close()
            return res.redirect(`/room/${roomId}`)
        }else{
            return res.render('incorrectpass', {roomId})
        }

        
        
    },
    async create(req, res){
        const db = await Database()

        const question = req.body.question;
        const roomId = req.params.room;

        db.run(`
            INSERT INTO questions (
                title,
                readed,
                room
            ) VALUES (
                '${question}',
                0,
                ${roomId}
            )
        `)

        res.redirect(`/room/${roomId}`)

        await db.close()
    }
}