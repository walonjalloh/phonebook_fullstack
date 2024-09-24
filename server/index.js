import express from 'express';
import cors from 'cors'
import corsOptions from "./configs/corsOptions.js";
import connectDB from './configs/mongodb.js';
import { config } from 'dotenv';
import Contact from './models/contact.js';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



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
        const {phone,firstName,lastName,address,email,userId}  = req.body

        //search our database for the user with the id 
        const user = await User.findById(userId)

        //check if the fields are provided

        if(!phone || !firstName || !lastName || !email || !address ){
            return res.status(400).json({error:"All fields are required"})
        }

        //creating a new contact in the database
        const contact = new Contact({
            firstName,
            lastName,
            email,
            address,
            phone,
            user:user.id
        })


        //saving new contact to the database
        const savedContact = await contact.save()
        user.contacts = user.contacts.concat(savedContact._id)
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
app.get('/contacts/:email', async(req,res) => {
    try{
        const contact = await Contact.findOne({email: req.params.email})
        if(!contact){
            return res.status(404).send()
        }
        res.send(contact)
    }catch(error){
        console.log(`Error is getting the contact,${error}`)
    }
})

//delete a contact
app.delete('/contacts/:email', async(req,res) => {
    try{
        const contact = await Contact.findOneAndDelete({email: req.params.email})
        if(!contact){
            return res.sendStatus(404)
        }
        res.send(contact)
    }catch (error){
        res.status(500).json({error:"Error deleting contacts"})
    }
})

//create a new user
app.post('/user/signup', async(req,res) => {
    try{
        const {userName,name,password} = req.body

        const saltRound = 10
        const passwordHarsh = await bcrypt.hash(password, saltRound)
        
        if(!userName || !name || !password){
            res.status(500).json({error: 'All field is required'})
        }

        const user = new User({
            name,
            userName,
            password:passwordHarsh
        })

        const savedUser = await user.save()
        // const userResponse = user.toObject()
        res.send(201)
    }catch(error){
        console.log(`Error creating user: ${error}`)
    }
})

//user signin 
app.post('/user/signin', async(req,res) => {
    const { userName, password}  = req.body

    const user = await User.findOne({userName})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

    if(!(userName && passwordCorrect)){
        return res.status(401).json({error:"invalid username and password"})
    }

    const userForToken = {
        username : user.userName,
        id: user._id
    }

    const token = jwt.sign(userForToken,process.env.JWT_SECRET)
    
    res.status(200).send({token,username: user.userName, name:user.name})
})

//geting a specific user
app.get('/user/one', async(req,res) => {
    const user = await User.find({}).populate('contacts')

    res.json(user)
})

//get all the user
app.get('/user', async(req,res)=> {
    try{
        const user = await User.find({})
        res.send(user)
    }catch(error){
        console.log(`error fetching ${error}`)
    }
})


app.listen(PORT)
console.log(`Server is running on port: ${PORT}`)