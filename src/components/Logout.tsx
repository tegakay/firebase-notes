import React from 'react'
import {signOut} from 'firebase/auth'
import {auth} from '../config/firebase'

const Logout = () => {
    const SIgnOut = ()=>{
        signOut(auth)//try catch
    }
  return (
    <div>
        <button onClick={Logout}>Log Out</button>
    </div>
  )
}

export default Logout