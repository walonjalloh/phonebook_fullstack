import express from 'express';
import cors from 'cors'
import corsOptions from "./configs/corsOptions.js";
import connectDB from './configs/mongodb.js';
import { config } from 'dotenv';
import Contact from './models/contact.js';
import User from './models/user.js';



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
        const { phone, firstName,lastName,email,address} = req.body
        const user = await User.findById(body.userId)

        //check if the fields are provided

        if(!phone || !firstName || !lastName || !email || !address ){
            return res.status(400).json({error:"All fields are required"})
        }

        //creating a new database
        const contact = new Contact({
            fullName,
            phone,
            user:user.id
        })


        //saving new contact to the database
        const savedContact = await contact.save()
        user.contacts = user.contacts.contact(savedContact._id)
        await user.save()

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

//create a new user
app.post('/contacts/user/signup', async(req,res) => {
    try{
        const {userName,name,password} = req.body
        
        if(!userName || !name || !password){
            res.status(500).json({error: 'All field is required'})
        }

        const user = new User({
            name,
            userName,
            password
        })

        const savedUser = await user.save()
        // const userResponse = user.toObject()
        res.send(201).json(savedUser)
    }catch(error){
        console.log(`Error creating user: ${error}`)
    }
})

//user signin 
app.post('/contacts/signin' , async(req,res) => {
    
})

//geting a specific user
app.get('/contacts/user', async(req,res) => {
    const user = await User.find({}).populate('contacts')

    res.json(user)
})


app.listen(PORT)
console.log(`Server is running on port: ${PORT}`)