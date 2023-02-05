import React from 'react'
import styled from 'styled-components'
import { Send } from '@mui/icons-material'

import { mobile } from '../common/script/responsive'

const Container = styled.div`
  height: 40vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #E4F8F0;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({
    width: '80%',
    fontSize: '50px',
    textAlign: 'center',
  })}
`
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({
    textAlign: 'center',
    width: '80%',
  })}
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  background-color: white;
  justify-content: space-between;
  border: 0.5px solid lightgray;
`
const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 20px;
`
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`


const Newsletter = () => {
  return (
    <Container>
      <Title>
        Newsletter
      </Title>
      <Description>
        Get timely updates for your latest
         favorite products.
      </Description>
      <InputContainer>
        <Input placeholder='Your email' />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter
