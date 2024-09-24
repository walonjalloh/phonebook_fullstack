import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const url = "http://localhost:3500/contacts";
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data)
        setContacts(response.data);
      } catch (error) {
        console.error(`Error fetching contacts: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const url2 = `http://localhost:3500/contacts/${id}`;
    try {
      const response = await axios.delete(url2);
      setContacts(contacts.filter((contact) => contact.id !== id));
      console.log(`Contact deleted successfully: ${response.data}`);
    } catch (error) {
      console.error(`Error deleting contact: ${error}`);
    }
  };

  const handleCreate = () => {
    navigate('/createcontact')
  }

  return (
    <section className="contact-list mt-48">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Book</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.length === 0 && <p className="text-center text-2xl font-bold text-red-600">List is empty</p>}
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-item bg-white shadow-md rounded-md px-4 py-4">
              <h1 className="text-xl font-bold mb-2">{contact.fullName}</h1>
              <p className="text-gray-600 mb-4">{contact.phone}</p>
              <button
                className="inline-block px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDelete(contacts.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mt-20 flex items-center justify-center">
          <button onClick={handleCreate} className="border-2 border-blue-500 py-2 px-6 text-xl bg-blue-500 text-white font-bold rounded-md ">Create Contact</button>
        </div>
      </div>
    </section>
  );
}

export default ContactList;