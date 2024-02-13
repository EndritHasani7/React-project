
import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardText } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom'

function Product() {
  const {id} = useParams()
  const [qty, setQty] = useState(0)
  const [product, setProduct] = useState()
  const [reviews, setReviews] = useState()
  const [cart, setCart] = useLocalStorage("cart", []);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
    .then(resp => setProduct(resp.data))
  }, [])

  useEffect(() => {
      if(product) {
        axios.get(`https://dummyjson.com/comments/post/${product.id}`)
        .then(resp => setReviews(resp.data.comments))
      }
  }, [product])

  const handleQtyChange = e => {
    setQty(e.target.value)
  }

  const handleAddToCart = () => {
    if(qty > 0) {
      const items = cart.filter(item => item.id == product.id)

      if(items.length > 0) {
        items[0].qty += parseInt(qty)
        setCart([...items, ...cart.filter(item => item.id != product.id)])
      } else {
        setCart([...cart, {...product, qty: parseInt(qty)}])
      }

      setQty(0)
      alert('Product was added successfully.')
    } 
  }

  return (
    <div className="container mt-4">
      {product && <div className="row">
        <div className="col-5">
          <Carousel data-bs-theme="dark">
            {
              product.images.map((image, key) => (
                <Carousel.Item key={key}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={product.title}
                  />
                </Carousel.Item>
              ))
            }
          </Carousel>
        </div>
        <div className="col-6 offset-1">

          <h2>{product.title}</h2>
          
          <p>{product.description}</p>

          <div className="mt-4">
            <strike>{`${product.price} EUR`}</strike> 
            <br />
            <span className="badge bg-danger me-2">-{product.discountPercentage}%</span> 
            <b>{`${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)} EUR`}</b>
          </div>

          <div className="mt-4">
            <div className="d-flex align-items-center">
              <label>in stock ({product.stock})</label>
              <input type="number" className="w-50 form-control mx-3" value={qty} max={product.stock} onChange={handleQtyChange} />
              <Button variant='outline-primary' onClick={handleAddToCart}>Add to cart</Button>
            </div>
          </div>

          {
            reviews && <div className="mt-5">
              <h3 class="mt-5">Reviews ({reviews.length})</h3>
              {
                reviews.map(review => (
                  <Card className="p-2 mt-3">
                    <CardText>
                      {review.body}
                      <br />
                      {review.user.username}
                    </CardText>
                  </Card>
                ))
              }
            </div>
          }

        </div>
      </div>}
    </div>
  )
}

export default Product