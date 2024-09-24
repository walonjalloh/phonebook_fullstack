import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="mt-96">
        <main>
            <div className="flex  items-center justify-center gap-10">
                <Link to='/contactlist'><button className="border-2 border-black py-2 px-6 rounded-md text-xl font-medium shadow-xl ">Contact List</button></Link>
                <Link to='/createcontact'><button className="border-2 border-blue-500 bg-blue-500 text-white py-2 px-6 text-xl font-medium shadow-xl rounded-md ">Add Contact</button></Link>
            </div>
        </main>
    </section>
  )
}

export default Hero
