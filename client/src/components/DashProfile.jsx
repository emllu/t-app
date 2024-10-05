import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashProfile = () => {
  const currentuser = useSelector((state) => state?.user?.currentuser);

  console.log('Current User:', currentuser);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h2 className='font-semibold text-center my-7 text-3xl'>Profile</h2>
      <form className='flex flex-col'>
        <div className='w-32 h-32 self-center overflow-hidden cursor-default shadow-md rounded-full'>
          <img
            src={currentuser.photourl}
            alt='profile'
            className='rounded-full w-full h-full object-cover border-8 bg-[light-gray]'
          />
        </div>

        <TextInput
          id='username'
          placeholder='username'
          defaultValue={currentuser?.username}  // Fallback for controlled component
          type='text'
          readOnly
        />
        <TextInput
          id='email'
          placeholder='email'
          defaultValue={currentuser?.email}  // Use the fallback for email
          type='email'
          readOnly
        />
        <TextInput
          id='password'
          placeholder='********'
          type='password'
        />

        <Button gradientDuoTone='blueToPink' outline>
          Update
        </Button>
      </form>
      {
        currentuser.isAdmin &&(
          <Link to='/create-post'>
            <Button
            gradientDuoTone='purpleToPink'
            outline>
              Post   

            </Button>
          </Link>
        )

        
      }

      <div className='text-red-700 text-1xl'>
        <span>Delete Account</span>
      </div>
    </div>
  );
};

export default DashProfile;
