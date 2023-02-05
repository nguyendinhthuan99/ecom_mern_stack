import React from 'react'
import styled from 'styled-components'

import { mobile } from '../common/script/responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(startpage.jpg) center;
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({
    width: '75%'
  })}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0px 0px;
`
const Aggreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  color: white;
  cursor: pointer;
  padding: 15px 20px;
  background-color: teal;
`

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder='name'/>
          <Input placeholder='last name'/>
          <Input placeholder='username'/>
          <Input placeholder='email'/>
          <Input placeholder='password'/>
          <Input placeholder='confirm password'/>
          <Aggreement>
            Your Use of our Site constitutes acceptance of these
            <b>Terms of Use</b> and your agreement to be bound by them.
          </Aggreement>
          <Button>
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
