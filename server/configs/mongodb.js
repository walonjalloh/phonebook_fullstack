import mongoose from "mongoose";

const connectDB = async() => {
    console.log('MongoDB connection with retry')
    try{
        await mongoose.connect(process.env.DATABASE_URL, {

        })
    }catch(error){
        console.log(`Error in connection ${error}`)
    }
}

export default connectDB