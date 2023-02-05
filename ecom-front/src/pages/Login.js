import { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../redux/callApis'
import { mobile } from '../common/script/responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: cover;
  justify-content: center;
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(startpage.jpg) center;
`
const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 10px 0px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  color: white;
  cursor: pointer;
  padding: 15px 20px;
  background-color: teal;
  margin-bottom: 10px;
  &:disabled {
    color: teal;
    cursor: not-allowed;
  }
`
const Link = styled.a`
margin: 5px 0px;
font-size: 12px;
text-decoration: underline;
cursor: pointer;
`
const Error = styled.span`
  font-size: 15px;
  color: red;
`

const Login = () => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { isFetching, error } = useSelector(state => state.user)

  console.log(isFetching, error)

  const handleLogin = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleLogin}
          >
            LOGIN
          </Button>
          { error && <Error>Something went wrong...</Error>}
          <Link>FORGOT PASSWORD?</Link>
          <Link>CREATE AN ACCOUNT</Link>
          <Link>TERMS OF SERVICE - PRIVACY & TERMS</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
