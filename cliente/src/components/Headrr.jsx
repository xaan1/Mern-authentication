import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Headrr = () => {
 
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser)
  return (
    <div className="bg-slate-200">
        <div className='flex justify-between item-center max-w-6xl max-auto p-3'>
           <Link to="/"><h1 className='font-bold'>Auth mern project</h1></Link>  
            <ul className='flex gap-4'>
                <Link to="/"> <li>home</li></Link>
                <Link to="/about"> <li>About</li></Link>
                <Link to="/profile">

              
                {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <Link to="/signin"> <li>Signin</li></Link>
            )}
              </Link>
         
               
             
            </ul>
        </div>
    </div>
  )
}

export default Headrr