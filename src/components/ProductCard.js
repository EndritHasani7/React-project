import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard({id, title, price, discountPercentage, thumbnail}) {
  return (
    <Card className="mb-4">
      <div style={{height: '250px', backgroundImage: `url('${thumbnail}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strike>{`${price} EUR`}</strike> 
          <br />
          <span className="badge bg-danger">-{discountPercentage}%</span> <b>{`${(price - (price * discountPercentage / 100)).toFixed(2)} EUR`}</b>
        </Card.Text>
        <Button href={`/product/${id}`} variant="outline-primary">Details</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard