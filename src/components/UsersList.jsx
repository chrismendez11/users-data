import React from 'react'
import './UsersList.css'
import axios from 'axios'
import { get } from 'react-hook-form'

const UsersList = ({ user, getAllUsers, setUpdate, setOpenForm}) => {

  const deleteUser = () => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
      .then(res => {
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateListener = () => {
    setOpenForm(true)
    setTimeout(() => {setUpdate(user)}, 0)
  }

  return (
    <article>
      <h2>{`${user["first_name"]} ${user["last_name"]}`}</h2>
      <hr />
      <div className='email-container'>
        <h3>EMAIL</h3>
        <p>{user.email}</p>
      </div>
      <div className='birthday-container'>
        <h3>BIRTHDAY</h3>
        <div>
          <i className='bx bx-gift' ></i> <p>{user.birthday}</p>
        </div>
      </div>
      <hr />
      <div className='btn-container'>
        <button onClick={deleteUser} className='btn-delete'><i className='bx bx-trash btn-icon' title='Delete User'></i></button>
        <button onClick={updateListener} className='btn-edit' title='Update User'><i className='bx bx-pencil btn-icon'></i></button>
      </div>
    </article>
  )
}

export default UsersList