import React from 'react'


const OAuth = ({providers})=> {
  return (
    <div>
      <loginHandler
        provider={providers.id}
      />
    </div> 
  )
}

export default OAuth