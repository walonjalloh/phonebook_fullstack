import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreateContact from './Pages/CreateContact'
import ContactListPage from './Pages/ContactListPage'
import SearchContact from './Pages/SearchContact'
import SignUpPage from './Pages/SignUpPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/createcontact' element={<CreateContact/>}/>
        <Route path='/contactlist' element={<ContactListPage/>}/>
        <Route path='/searchcontact' element={<SearchContact/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
