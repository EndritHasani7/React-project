import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Register() {
  const [users, setUsers] = useLocalStorage('users', [])
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
  const navigate = useNavigate()

  useEffect(() => {
    if(isLoggedIn != null) {
      navigate("/dashboard");
    }
  }, [])

  const handleRegister = e => {
    e.preventDefault()
    const form = e.target.elements
    const user = {
      id: uuidv4(),
      fullname: form[0].value,
      email: form[1].value,
      password: form[2].value,
    }

    if(users.filter(ls_user => user.email == ls_user).length > 0) {
      alert(`${user.email} is already is use! Please choose different email address.`)
    } else {
      setUsers([...users, user])
      setIsLoggedIn(user)
      navigate("/dashboard");
    }
  }
  
  return (
    <section className="mt-4">
      <div className="container">
        <Form className="mx-auto w-50" onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" name="fullname" required placeholder="Enter fullname" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" required placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" required placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default Register