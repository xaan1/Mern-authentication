import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Oath from '../components/Oath';
const Signup = () => {
 



  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handlechange(e){
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const  handlesubmit  = async (e)=>{

    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api//auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.mssge === "some thing rounde") {
        setError(true);
        return ;
      }
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(true);
    }

  }
 
  return (

    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>signup</h1>
      <form className='flex flex-col gap-4'  onSubmit={handlesubmit}>
        <input type='text' placeholder='username' id='username' className='bg-slate-100 rounded-lg p-3'  onChange={handlechange}/>
        <input type='text' placeholder='email' id='email' className='bg-slate-100 rounded-lg p-3'  onChange={handlechange}/>
        <input type='text' placeholder='password' id='password' className='bg-slate-100 rounded-lg p-3'   onChange={handlechange}/>
        <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "loading" : "signup"}</button>
        <Oath/>
      </form>
      <div className='flex gap-3 mt-5'>
     <p className=' text-blue-500'>Have a counte ?</p>
     <Link to="/signin"> signin</Link>

      </div>
      
    </div>
  )
}

export default Signup