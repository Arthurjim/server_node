const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
//creating server
const app = express();
//connectign db
connectDB()

//hablitar cors para que pueda comunicarse a otro servidor
app.use(cors())

const port  = process.env.PORT || 4000
app.set("port",port)

//Avalible express.json
app.use(express.json({extended:true})) //write json from views

//import routes

app.use('/api/users',require('./routes/users-routes'))
app.use('/api/auth',require('./routes/auth-routes'))
app.use('/api/projects',require('./routes/projects-routes'))
app.use('/api/tasks',require('./routes/task-routes'))




app.listen(port, '0.0.0.0', () => {
    console.log(`Server on port ${port}`)
})