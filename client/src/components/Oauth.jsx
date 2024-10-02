// src/components/Oauth.js
import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../firebase/config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signinFailure, signinsuccess } from '../redux/userSlices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const resultWithGoogle = await signInWithPopup(auth, provider);
      // Handle the result, e.g., get user info or token here
      console.log('User signed in:', resultWithGoogle);

      const response = await axios.post('http://localhost:3000/auth/google', {
        username: resultWithGoogle?.user?.displayName || 'Anonymous',
        email: resultWithGoogle?.user?.email,
        photourl: resultWithGoogle?.user?.photoURL || 'default-photo-url.jpg', // Set a default if photoURL is undefined
      });

      if (response?.data?.success === true) {
        console.log(`${JSON.stringify(response?.data?.user)} google signin`);
        dispatch(signinsuccess(JSON.stringify(response?.data?.user)));
        navigate('/');
      } else {
        dispatch(signinFailure('Google sign-in failed'));
      }
    } catch (error) {
      console.error('Error during sign in with Google:', error);
      dispatch(signinFailure('Error during Google sign-in'));
    }
  };

  return (
    <Button gradientDuoTone="pinkToOrange" outline onClick={handleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-1" />
      Continue with Google
    </Button>
  );
};

export default Oauth;
