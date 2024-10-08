import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signinstart, signinFailure, signinsuccess } from '../redux/userSlices';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import Oauth from '../components/Oauth';
const Signin = () => {
  const [formData, setFormData] = useState({
   
    email: '',
    password: ''
  });
const navigate=useNavigate()
  const dispatch = useDispatch();
  const { error: errorMessage, loading: isLoading } = useSelector(state => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email  || !formData.password) {
      dispatch(signinFailure('Please fill out all fields'));
      return;
    }

    try {
      dispatch(signinstart());
      const response = await axios.post('http://localhost:3000/auth/signin', formData);

      // If user already exists
      if (response.data.success === false) {
        dispatch(signinFailure(response.data.message));
        return;
      }
      // Success
      dispatch(signinsuccess(response.data.user)); // Store the user object directly
      console.log('logged in', (response.data.user))
     navigate('/dashboard')
    } catch (error) {
      console.log(error)
      dispatch(signinFailure('Signin failed'));
    }
  };

  return (
    <div className='min-h-screen mt-10'>
      <div className='flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1 w-full md:w-1/2'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
             Eman's
            </span> Blog
          </Link>
          <p className='text-sm mt-5'>
            Welcome to the Signin page! Sign in with your Email and password.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            {errorMessage && <Alert color="failure">{errorMessage}</Alert>}


            <div>
              <Label value='Your Email' />
              <TextInput
                placeholder='email@gmail.com'
                id='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                placeholder='Write a strong password'
                id='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit' disabled={isLoading}>
              {isLoading ? <Spinner size='sm' /> : 'Signin'}
            </Button>
            <Oauth/>
          </form>
        
          <div className='mt-5 flex gap-1 text-sm'>
            <span> Don't You have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
