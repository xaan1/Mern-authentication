import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';


import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../Firabse.JS';
import { updateUserFailure, updateUserStart, updateUserSuccess ,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOut} from '../redux/user/Userslice';


const Profile = () => {  
  const fileref = useRef(null)
  const { currentUser,loading,error } = useSelector((state) => state.user);
  
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePercent, setImagePercent] = useState(0);
  const dispatch = useDispatch()
  const [updateSuccess, setUpdateSuccess] = useState(false);


  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload= (image)=> {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );

   

  }

  const handlechange= async(e)=> {
    setFormData({...formData , [e.target.id]:e.target.value})
  
  }
  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/updated/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data))
      
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true);
     
    } catch (error) {
 
    }
  
  }

  const deletedacconte = async()=> {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/dleted/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(deleteUserFailure(data))
      
        return;
      }
      dispatch(deleteUserSuccess(data))
      setUpdateSuccess(true);
     
    } catch (error) {
 
    }
  
  }

  const handesignout = async()=> {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    } 

  }
  return (
    <div className='max-w-lg  mx-auto p-10'> 
      <h1 className='text-3xl  text-center font-semibold'>profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handlesubmit} >
        <input type='file'  ref={fileref} className='hidden'     accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
        <img src=  {formData.profilePicture || currentUser.profilePicture} className='h-24 w-24 self-center  rounded-full opject-cover cursor-pointer'
        onClick={() => fileref.current.click()}
     
        />
          <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
      
        <input defaultValue={currentUser.username} type='text' id='username' name='username' placeholder='username' className='bg-slate-100 rounded-full opject-cover p-3'
         onChange={handlechange}/>
        <input defaultValue={currentUser.email
} type='text' id='email' name='username' placeholder='email' className='bg-slate-100 rounded-full opject-cover p-3'  onChange={handlechange}/>
        <input  type='text' id='password' name='password' placeholder='password' className='bg-slate-100 rounded-full opject-cover p-3'  onChange={handlechange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={deletedacconte}>Delte Aconnte</span>
        <span className='text-red-700 cursor-pointer ' onClick={handesignout}>Sign OUT</span>
        
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
    
    </div>
  )
}

export default Profile