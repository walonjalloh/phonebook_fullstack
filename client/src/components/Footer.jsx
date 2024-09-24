import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Footer() {
    const date = new Date().getFullYear()
  return (
    <footer>
        <main className='mt-80 mx-4'>
          <div className='flex flex-col md:flex-row  justify-between items-center'>
              <div className="flex flex-col gap-4  md:flex-row md:gap-2 items-center ">
                <Link to='/'><img src={logo} alt="logo" className='w-[60px] h-[60px]' /></Link>
                <p className='font-medium text-md'>&copy;{date} All right Reserved</p>
              </div>
              <div className='flex list-none items-center font-medium gap-6 text-[14px]'>
                  <li>Terms of Service</li>
                  <li>About Us</li>
              </div>
          </div>
        </main>
    </footer>
  )
}

export default Footer
