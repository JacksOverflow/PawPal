import React from 'react'
import { signIn } from 'next-auth/client'

const loginHandler = ({children, provider}) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn(provider.id)

  }
  return (
    <form onSubmit={handleSubmit}>
      <input/>

      {children}
      
      <button>
        Sign in
      </button>
    </form>
  )
}
export default loginHandler
