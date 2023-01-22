import axios from 'axios'
import React from 'react'
import './UsersForm.css'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const UsersForm = ({ getAllUsers, update, setUpdate, setOpenForm, openForm}) => {

    const defaultValue = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: ""
    }

    useEffect(() => {
        if (update) {
            reset(update)
        }
    }, [update])

    const addUser = data => {
        axios.post('https://drf-api-users.onrender.com/api/users/', data)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch()
    }

    const updateUser = data => {
        axios.put(`https://drf-api-users.onrender.com/api/users/${update.id}/`, data)
            .then(res => {
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const { register, reset, handleSubmit } = useForm()

    const submit = data => {
        if (update) {
            updateUser(data)
            setUpdate()
        } else {
            addUser(data)
        }
        reset(defaultValue)
        setOpenForm()
    }

    return (
        <div className='background'>
        <div className='form-container'>
            <button onClick={() => {setOpenForm(); setUpdate()}} className='btn-exit'><i className='bx bx-x'></i></button>
            <h2>{update ? 'Update User' : 'New User'}</h2>
            <form onSubmit={handleSubmit(submit)} action="">
                <div className='input-container'>
                    <label htmlFor="first_name">First Name</label>
                    <input {...register("first_name")} type="text" id='first_name' placeholder='First Name'/>
                </div>
                <div className='input-container'>
                    <label htmlFor="last_name">Last Name</label>
                    <input {...register("last_name")} type="text" id='last_name' placeholder='Last Name'/>
                </div>
                <div className='input-container'>
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} type="text" id='email' placeholder='Email'/>
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password</label>
                    <input {...register("password")} type="password" id='password' placeholder='Password'/>
                </div>
                <div className='input-container'>
                    <label htmlFor="birthday">Birthday</label>
                    <input {...register("birthday")} type="date" id='birthday' />
                </div>
                <button>{update ? 'Update' : 'Add'}</button>
            </form>
        </div>
        </div>
    )
}

export default UsersForm