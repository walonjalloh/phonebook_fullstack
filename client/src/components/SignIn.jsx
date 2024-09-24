import { useState } from "react";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [sucess, setSuccess] = useState('')

  const url = 'http://localhost:3500/user/signin'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        userName:username,
        password:password
    }

    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      setSuccess("login successfull")
      setUsername('')
      setPassword('')
      setError('')
    } catch (error) {
      console.error(error);
      setError("error sign in")
      setUsername('')
      setPassword('')
      setSuccess('')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-48">
      <main className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        {sucess && <p className="text-green-500 my-6">{sucess}</p>}
        {error && <p className="text-red-600 my-6">{error}</p>}
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700">Username</label>
            <input type="text" id="username" className="border rounded-md p-2" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input type="password" id="password" className="border rounded-md p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full">Sign In</button>
        </form>
      </main>
    </div>
  );
}

export default SignIn;