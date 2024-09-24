import { useState } from "react";
import axios from "axios";

function ContactSearch() {
  const [name, setName] = useState("");
  const [searchPerson, setSearchPerson] = useState([]);
  const url = "http://localhost:3500/contacts";

  const handleName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(url);
      const data = response.data;
      const person = data.filter((data) => data.fullName === name);
      setSearchPerson(person);
      setName("");
    } catch (error) {
      console.error(`Error fetching contacts: ${error}`);
    }
  };

  return (
    <section className="contact-search mt-48">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search for a Contact</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
          <label htmlFor="name" className="text-lg font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleName}
            className="border rounded-md border-gray-300 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
        {searchPerson.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchPerson.map((searchPerson) => (
                <div
                  key={searchPerson.id}
                  className="bg-white shadow-md rounded-md px-4 py-4"
                >
                  <h1 className="text-xl font-bold mb-2">{searchPerson.fullName}</h1>
                  <p className="text-gray-600 mb-4">{searchPerson.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </section>
  );
}

export default ContactSearch;