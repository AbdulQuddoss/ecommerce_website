import React from 'react'
import styled from 'styled-components'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Trusted from '../components/Trusted'
import FeatureProducts from '../components/FeatureProducts'

const Home = () => {

  const data = {
    storeName: "Abdul,s Store",
  }

  return (
    <>
      <HeroSection myData={data}/>
      <FeatureProducts />
      <Services />
      <Trusted />
    </>
  )
}

export default Home