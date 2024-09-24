import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }   
})

const User = mongoose.model('User',userSchema)

export default User