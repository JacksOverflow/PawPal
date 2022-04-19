import React, { useState } from 'react'
import axios from 'axios'

const HxInput = () => {
  const [history, setHistory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/handlers', { history })
      setHistory('')
    } catch (err) {
        console.log("Error posting thread")
    }
  }

  return (
    <div>
      <h2>
        Medical History
      </h2>

      <form
      onSubmit={handleSubmit}>
        <input type="text" value={history}
        onChange={e => setHistory(e.target.value)} />

        <button type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default HxInput
