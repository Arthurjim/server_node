const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:Boolean,
        required:true,
        default:false
    },
    register:{
        type:Date,
        default:Date.now()
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }
})


module.exports = mongoose.model('Task',TaskSchema)