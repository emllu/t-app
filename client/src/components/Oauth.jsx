import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';

const Oauth = () => {
  return (
    <Button  gradientDuoTone='pinkToOrange' outline>
      <AiFillGoogleCircle  className='w-16 h-5 mr-4 ' />
      Continue with Google
    </Button>
  );
};

export default Oauth;
