//IMPORTAÇOES
const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')

//PORT
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(routes)


app.listen(PORT, ()=>console.log(`Server running at PORT: ${PORT}`))