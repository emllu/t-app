import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1 w-full md:w-1/2'> {/* Increase width here */}
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Shand's</span> Blog
          </Link>
          <p className='text-sm mt-5'>
            Welcome to the Signup page! Sign up with your Email and password.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value="Your User Name:" />
              <TextInput
                type="text"
                placeholder='name'
                id='username'
              />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput
                placeholder='email@gmail.com'
                id='email'
                type='email'
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                placeholder='Write a strong password'
                id='password'
                type='password'
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit'>Signup</Button>
          </form>
          <div className='mt-5 flex gap-1 text-sm'>
            <span>You have an account?</span>
            <Link to='signin' className='text-blue-500'>
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
