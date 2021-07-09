import React, { useContext } from 'react'
import { signInWithGoogle } from '../auth';
import { UserContext } from '../context';

const Navbar = () => {
    const [user,setUser] = useContext(UserContext).user;

    const login=async()=>{
        let userAfterSignIn= await signInWithGoogle();
      
        if(userAfterSignIn){
          
          setUser(userAfterSignIn)
          console.log(userAfterSignIn);

         
        }  
     
         
     
     
      }
    return (
        <div>
            <button onClick={login}>login</button>
        </div>
    )
}

export default Navbar
