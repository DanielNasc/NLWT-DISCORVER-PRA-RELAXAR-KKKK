const Database = require('../db/config')

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password

        console.log(pass);

        let roomId

        for(var i = 0; i < 6; i++){
            const randomNumber = Math.floor(Math.random() * 10).toString()

            i == 0? roomId = randomNumber:
            roomId += randomNumber
        }
        await db.run(`INSERT INTO rooms (
            id,
            pass
        ) VALUES (
            ${Number(roomId)},
            "${pass}"
        )`)

        await db.close()

        return res.redirect(`/room/${roomId}`)
    }
}