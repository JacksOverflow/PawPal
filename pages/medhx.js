import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'

import HxInput from '../components/HxInput'
import HxItem from '../components/HxItem'


const MedHx = () => {
    const [hx, setHx] = useState([])

    useEffect(() => {
        const fetchHx = async () => {
          try {
            const res = await axios.get('/api/handlers')
            setHx(res.data)
          } catch (err) {
            console.log("Error Get request")
          }
        }
        fetchHx()
      },[])  
      
      return (
        <div>
          <main>
            <HxInput />
            <div>
              {
                hx.map(history => (
                  <HxItem key={history._id} history={history} />
                ))
              }
            </div>
          </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session){
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: { session }
    }
  }

export default MedHx