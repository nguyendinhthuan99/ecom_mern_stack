import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  color: white;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  background-color: teal;
  justify-content: center;
`

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Shipping on Orders Over $50
    </Container>
  )
}

export default Announcement
