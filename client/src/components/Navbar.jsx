import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { Menu } from 'lucide-react'
import { useState } from "react"

function Navbar() {

    const [isOpened, setIsOpened] = useState(false)

    const handleOpen = () => {
        setIsOpened(!isOpened)
    }

   
  return (
    <header className="sticky top-0 z-50 my-4 ">
        <nav className="mx-2">
            <div className="flex items-center justify-between">
                <Link to='/'><div>
                    <img src={logo} alt="logo" className="w-[60px] h-[60px]" />
                    </div></Link>
                <div className="hidden md:flex justify-center gap-20 text-lg font-medium ">
                    <Link to='/'><button>Home</button></Link>
                    <Link to='/contactlist'><button>PhoneBook</button></Link>
                    <Link to='/searchcontact'><button>Search</button></Link>
                </div>
                <div className="hidden md:flex">
                    <Link to='/createcontact'><button className="border-2 border-black px-4 py-2 shadow-xl rounded-md text-lg font-medium">Create Contact</button></Link>
                </div>
                <div className="md:hidden">
                    <Menu onClick={handleOpen} className="cursor-pointer"/>
                </div>
            </div>
        </nav>
        {isOpened && (
            <nav  className="md:hidden flex flex-col text-lg font-medium items-center gap-2">
                <Link to='/searchcontact'><button>Search</button></Link>
                <Link to='/'><button>Home</button></Link>
                <Link to='/contactlist'><button>PhoneBook</button></Link>
                <Link to='/createcontact'><button className="border-2 border-black px-4 py-2  shadow-xl rounded-md text-lg font-medium">Create Contact</button></Link>
            </nav>
        )}
    </header>
  )
}

export default Navbar
