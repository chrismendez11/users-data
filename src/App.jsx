import { useState } from 'react'
import './App.css'
import axios from 'axios'
import UsersList from './components/UsersList'
import { useEffect } from 'react'
import UsersForm from './components/UsersForm'

function App() {
  const [users, setUsers] = useState()
  const [update, setUpdate] = useState()
  const [openForm, setOpenForm] = useState()

  const getAllUsers = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const newUserBtn = () => {
    setOpenForm(true)
  }

  return (
    <div className="App">
      <div className='header'>
        <h1>Users data</h1>
        <button onClick={newUserBtn}>+ Add new user</button>
      </div>
      {openForm && <UsersForm
        getAllUsers={getAllUsers}
        update={update}
        setUpdate={setUpdate}
        openForm={openForm}
        setOpenForm={setOpenForm}
      />}
      <div className='cards-container'>
        {users?.map(user => (
          <UsersList
            key={user.id}
            user={user}
            getAllUsers={getAllUsers}
            setUpdate={setUpdate}
            setOpenForm={setOpenForm}
          />
        ))}
      </div>
    </div>
  )
}

export default App
