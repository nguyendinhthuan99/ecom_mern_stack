const express = require('express')

const app = express()
require('dotenv').config()
const cors = require('cors')

const DB = require('./src/provider/Db.js')
const route = require('./src/routes/index.js')

DB.connect()
DB.DBhandleEvent()
process.on('SIGINT', async () => {
    console.log('1closed db connection')
    await DB.closeDBconnection()
    console.log('closed db connection')
    process.exit(0)
})
app.use(cors())
app.use(express.json())
route(app)

app.listen(process.env.PORT || 5500, () => {
    console.log('Server is running');
})

