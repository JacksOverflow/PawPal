import React, { useEffect } from 'react'
import OAuth from '../components/auth/OAuth'
import GoogleProvider from 'next-auth/providers/google'


const Login = ({session}) => {

  if(session) return null;
  return (
    <div>
        <p>Please Wait...</p>
        <OAuth
          providers = {GoogleProvider}
        />
    </div>
  )
}

export default Login
