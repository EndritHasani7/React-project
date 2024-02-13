import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect, useNavigate } from 'react-router-dom';

function Login() {
  const [users, setUsers] = useLocalStorage('users', [])
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
  const navigate = useNavigate()

  useEffect(() => {
    if(isLoggedIn != null) {
      navigate("/dashboard");
    }
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    const form = e.target.elements
    const email = form[0].value
    const password = form[1].value
    const db_users = users.filter(user => (user.email == email && user.password == password))

    if(db_users.length > 0) {
      setIsLoggedIn(users[0])
      navigate("/dashboard");
    } else {
      alert(`Invalid credentials!`)
    }
  }
  
  return (
    <section className="mt-4">
      <div className="container">
        <Form className="mx-auto w-50" onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" required placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" required placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default Login