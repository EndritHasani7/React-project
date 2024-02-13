import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const btnCss = { width: '20px', display: 'inline-block', textAlign: 'center', textDecoration: 'none', border: '1px solid #333', margin: '0px 5px', padding: '0px'}

function Cart() {
  const [cart, setCart] = useLocalStorage('cart', [])
  const [orders, setOrders] = useLocalStorage('orders', [])
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
  const [show, setShow] = useState(false);
  const [data, setData] = useState({})
  const navigate = useNavigate()

  const handleClose = () => setShow(false);

  const handleShow = () => {
    if(isLoggedIn == null) {
      alert('Please login first!')
    } else {
      setShow(true);
    }
  }

  const handleSubmit = () => {
    const order = {...data, products: cart, user: isLoggedIn.id}
    setOrders([...orders, order])
    setCart([])
    setShow(false)
    navigate("/dashboard");
  }

  const handleDecQty = e => {
    const id = e.target.getAttribute('item')
    const item  = cart[id]

    if(item.qty > 1) {
      item.qty -= 1
      setCart([...cart.filter((item, key) => key != id), item])
    } else {
      setCart([...cart.filter((item, key) => key != id)])
    }
  }

  const handleIncQty = e => {
    const id = e.target.getAttribute('item')
    const item  = cart[id]

    if(item.qty < item.stock) {
      item.qty += 1
      setCart([...cart.filter((item, key) => key != id), item])
    } else {
      alert(`Max qty ${item.stock}!`)
    }
  }

  return (
    <section className="mt-4">
      <div className="container">
        {
          (cart && cart.length > 0) ?
          <>
           <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              cart.map((item, key) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <a href="#" style={btnCss} onClick={handleDecQty} item={key}>-</a>
                    <a href="#" style={btnCss} onClick={handleIncQty} item={key}>+</a>
                    <span className="mx-2">{item.qty}</span>
                  </td>
                  <td>{item.price.toFixed(2)} EUR</td>
                  <td align='right'>{(item.qty * item.price).toFixed(2)} EUR</td>
                </tr>
              ))
            }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"></td>
                <td align='right' style={{fontWeight: 'bold'}}>{(cart.reduce((sum, item) => sum + (item.qty * item.price), 0.00)).toFixed(2) } EUR</td>
              </tr>
            </tfoot>
          </table>
          <Button variant="primary" onClick={handleShow}>
            Checkout
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label htmlFor="fullname">Fullname</Form.Label>
              <Form.Control type="text" id="fullname" onChange={(e) => setData(data => { return {...data, fullname: e.target.value}}) } />
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" onChange={(e) => setData(data => { return {...data, email: e.target.value}}) } />
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control type="tel" id="phone" onChange={(e) => setData(data => { return {...data, phone: e.target.value}}) } />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
          </Modal>
          </> : <p>Cart is empty!</p>
        }
      </div>
    </section>
  )
}

export default Cart