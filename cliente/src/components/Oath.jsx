import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../Firabse.JS';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/Userslice';
import { useNavigate } from 'react-router-dom';

const Oath = () => {
    const dispach = useDispatch()
    const  nvaigate = useNavigate()
  
    const handlechange = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);
    
          const result = await signInWithPopup(auth, provider);
          console.log(result)
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              profilePicture: result.user
              .photoURL
              ,
              
              
            })
          });
          const data = await res.json();
          console.log(data);
          dispach(signInSuccess(data));
          nvaigate('/');
        } catch (error) {
          console.log('could not login with google', error);
        }
      };
  return (
  
    <button onClick={handlechange} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase '>continiu with google</button>
  )
}

export default Oath