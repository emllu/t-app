import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const {currentuser} =useSelector(state=>state.user)
  return (
    <div className=' max-w-lg max-auto p w-full p-3'>
        <h2 className='font-semibold text-center my-7 text-3xl'>Profile</h2>
        <form className='flex flex-col'>
            <div className='w-32 h-32 self-center overflow-hidden cursor-default shadow-md rounded-full'>
                <img src={currentuser.photourl} alt='profile' className='rounded-full w-full h-full object-cover  border-8 bg-[light-gray]'/>
            </div>
            <TextInput
            id='username'
            placeholder='username'
            defaultValue={currentuser.username}
            type='text'/>
            <TextInput
            id='email'
            placeholder='email'
            defaultValue={currentuser.email}
            type='email'/>
            <TextInput
            id='password'
            placeholder='password'
            type='password'/>
<Button gradientDuoTone='blueToPink' outline>

    update
</Button>

            

        </form>
        <div className='text-red-700 text-1xl'>
            <span className=''>Delete Account</span>
          
        </div>
    </div>
  )
}

export default DashProfile