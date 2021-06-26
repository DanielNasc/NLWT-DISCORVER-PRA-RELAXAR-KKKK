module.exports = {
    index(req, res){
        const roomId = req.params.room
        const question = req.params.question
        const action = req.params.action
        const pass = req.body.password

        console.log(`${roomId} ${action} ${pass} ${question}`);
    }
}