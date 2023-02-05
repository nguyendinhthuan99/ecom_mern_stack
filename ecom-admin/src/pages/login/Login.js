import { useState } from "react"
import { useDispatch } from 'react-redux'
import { login } from '../../redux/callApis'
import { useHistory } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const history = useHistory()

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    const loginState = await login(dispatch, { username, password })

    console.log(loginState)

    loginState && history.push('/')

    console.log('aaa')
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <input
        style={{
          padding: '10px',
          marginBottom: '20px',
        }}
        type='text'
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{
          padding: '10px',
          marginBottom: '20px',
        }}
        type='password'
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{padding: '10px'}}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  )
}

export default Login
