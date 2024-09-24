import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate()

  const url = 'http://localhost:3500/user/signup'
  const handleName = (event)=> {
    event.preventDefault()
    setName(event.target.value)
  }

  const handleUserName = (event)=>{
    event.preventDefault()
    setUserName(event.target.value)
  }

  const handlePassword=(event)=>{
    event.preventDefault() 
    setPassword(event.target.value)
 }

 const handleSubmit= (event)=>{
    event.preventDefault()
    const data = {
        name:name,
        userName: userName,
        password:password
    }

    try{
        axios.post(url,data).then(response => {
            console.log(`created user: ${response.data}`)
        })
        navigate('/contactlist')
    }catch(error) {
        console.log(error)
    }
 }

  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <main className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
        <p className="text-center mb-6">Or sign in to an existing account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">Name</label>
            <input type="text" id="name" className="border rounded-md p-2" value={name} onChange={handleName} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700">Username</label>
            <input type="text" id="username" className="border rounded-md p-2" value={userName} onChange={handleUserName} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input type="password" id="password" className="border rounded-md p-2" value={password} onChange={handlePassword} />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full">Sign Up</button>
        </form>
      </main>
    </section>
  );
}

export default SignUp;