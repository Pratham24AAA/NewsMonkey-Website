import React from 'react'
import loading from './Gear-0.2s-200px.gif'

const Spinner = () => {
    return (
      <div className="text-center">
            <img src = {loading} alt="loading" style={{ width: '60px', height: '60px' }}/>
      </div>
    )
  }

export default Spinner
