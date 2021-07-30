const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'})

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex: true
        })
        console.log('DATABASE CONNECTED')
    } catch (error) {
        console.error(error)
        process.exit(1)//detiene la app si hay error
    }
}

module.exports = connectDB