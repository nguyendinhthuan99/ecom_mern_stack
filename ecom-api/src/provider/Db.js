const mongoose = require('mongoose')
require('dotenv').config()

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
  }
  catch (err) {
    console.log("fallure: ")
  }
}
function DBhandleEvent() {
  mongoose.connection.on('connected', () => console.log('DB connection established'))
  mongoose.connection.on('error', err => console.log(err.message))
  mongoose.connection.on('disconnected', () => console.log('DB connection closed'))
}

async function closeDBconnection() {
  await mongoose.connection.close()
  console.log('DB connection closed')
}
module.exports = { connect, DBhandleEvent, closeDBconnection }
