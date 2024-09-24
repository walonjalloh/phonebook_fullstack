import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactSchema = new Schema(
{
    firstName: {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    address :{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}
)

//make sure the data from mongo returned id as string and also not return the version
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Contact = mongoose.model('Contact',contactSchema)

export default Contact;