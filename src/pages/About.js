import React from 'react'
import HeroSection from '../components/HeroSection'
import styled from 'styled-components'

const About = () => {
  
  const data = {
    storeName: "Abdul,s Ecommerce"
  }
  return (
    <Wrapper>
      <HeroSection myData={data}/>
    </Wrapper>
  )
}

const Wrapper = styled.section``;

export default About