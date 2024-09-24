import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreateContact from './Pages/CreateContact'
import ContactListPage from './Pages/ContactListPage'
import SearchContact from './Pages/SearchContact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/createcontact' element={<CreateContact/>}/>
        <Route path='/contactlist' element={<ContactListPage/>}/>
        <Route path='/searchcontact' element={<SearchContact/>}/>
      </Routes>
    </Router>
  )
}

export default App
