import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import Registration from './components/Registration/Registration'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Registration /> //Testing purposes -- remove later
    </div>
  )
}

export default App
