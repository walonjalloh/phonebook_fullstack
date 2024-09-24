import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function ContactCreate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const url = "http://localhost:3500/contacts";
  const navigate = useNavigate()

  const handleName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleNumber = (event) => {
    event.preventDefault();
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('')
    setError('')
    const data = {
      fullName: name,
      phone:phone,
    };

    try {
      const response = await axios.post(url, data);
      console.log(`Data sent successfully ${response}`);
      setName("");
      setPhone("");
      setSuccess('Contact added')
      setTimeout( navigate('/contactlist'), 2000)
    } catch (error) {
      console.error(`Error sending data: ${error}`);
      setError('Error in adding contact')
      setName('')
      setPhone('')
    }
    
  };

  const handlePhoneBook = () => {
    navigate('/contactlist')
  }

  return (
    <section className="contact-create">
      <main className="mt-28 container mx-auto px-4">
        <div className="flex flex-col items-center justify-start">
          <h1 className="text-center font-bold text-4xl">Create Contact</h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col max-w-lg w-full">
              <div className="flex flex-col items-start justify-start my-4">
                <label className="text-lg font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Fullname"
                  onChange={handleName}
                  className="border rounded-md border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
              </div>
              <div className="flex flex-col items-start justify-start my-4">
                <label className="text-lg font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Fullname"
                  onChange={handleName}
                  className="border rounded-md border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
              </div>
              <div className="flex flex-col items-start justify-start my-4">
                <label className="text-lg font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Fullname"
                  onChange={handleName}
                  className="border rounded-md border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
              </div>
              <div className="flex flex-col items-start justify-start my-4">
                <label className="text-lg font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Fullname"
                  onChange={handleName}
                  className="border rounded-md border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
              </div>
              <div className="flex flex-col max-w-lg w-full">
                <label className="text-lg font-bold mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={handleNumber}
                  className="border rounded-md border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                />
              </div>
              <button
                type="submit"
                className="mt-10 px-6 py-2 bg-blue-500 text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Contact
              </button>
            </form>
            <div className="flex flex-col">
              <button onClick={handlePhoneBook} className="mt-10 px-6 py-2 border-2 border-black/50 text-black font-bold text-lg rounded-md">PhoneBook</button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default ContactCreate;