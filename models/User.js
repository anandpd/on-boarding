import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    name : {
        type: String,
        trim: true,
        required : true
    },
    email : {
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

export default model('user', userSchema);