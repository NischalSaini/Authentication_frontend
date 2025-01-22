//import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import background from '../assets/background.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home
