import React, {useEffect, useState} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase'

export const Authdetails = () => {
    const [user, setUser] = useState('');

    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user)=>{
            if (user){
              const uid = user.uid;
                setUser(uid);
            } else {
              //  setUser(null);
            }
        })
    },[])

    return user
  // return (
  //   <div>Authdetails</div>
  // )
}

//export default Authdetails