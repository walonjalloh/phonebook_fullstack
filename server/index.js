import express from 'express';
import cors from 'cors'
import corsOptions from "./configs/corsOptions.js";
import connectDB from './configs/mongodb.js';
import { config } from 'dotenv';
import Contact from './models/contact.js';


//initializing the app with express
const app = express()
//define port that i will be using
const PORT = 3500

app.use(express.json())
//making the app accessible by my url only using cors
app.use(cors(corsOptions))



config()


//connection to the database
connectDB()


app.get('/', (req,res) => {
    res.send('<h1>Hello World</h1>')
})

//read all contacts
app.get('/contacts', async (req,res) => {
    try{
        const contacts = await Contact.find({}) 
        res.send(contacts)
    }catch(error){
        res.status(500).send(error)
    }
})

//to create a new contact
app.post('/contacts', async(req,res) => {
    try{
        const { phone, fullName} = req.body

        //check if the fields are provided

        if(!phone || !fullName ){
            return res.status(400).json({error:"All fields are required"})
        }

        //creating a new database
        const contact = new Contact({
            fullName,
            phone
        })


        //saving new contact to the database
        await contact.save()

        //converting the contact to object
        const contactResponse = contact.toObject()

        res.status(201).json({contact: contactResponse})
    }catch(error){
        console.log(`Adding contact error ${error}`)
        res.status(500).json({message: "An error occurred during contact creation"})
    }
})

//get a specific contacts
app.get('/contacts/:id', async(req,res) => {
    try{
        const contact = await Contact.findById(req.param.id)
        if(!contact){
            return res.status(404).send()
        }
        res.send(contact)
    }catch(error){
        console.log(`Error is getting the contact,${error}`)
    }
})

//delete a contact
app.delete('/contacts/:id', async(req,res) => {
    try{
        const { id } = req.params
        const contact = await Contact.findByIdAndDelete(id)
        if(!contact){
            return res.send(404).send()
        }
        res.send(contact)
    }catch (error){
        res.status(500).send(error)
    }
})


app.listen(PORT)
console.log(`Server is running on port: ${PORT}`)