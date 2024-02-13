import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://iqq6kf0xmf.gjirafa.net/images/d3835dd9-f002-4191-9519-8eb5c7abdb5f/d3835dd9-f002-4191-9519-8eb5c7abdb5f.jpeg?w=1920"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://iqq6kf0xmf.gjirafa.net/images/ef361e2b-9b6f-4155-b110-f9321a054e11/ef361e2b-9b6f-4155-b110-f9321a054e11.jpeg?w=1920"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://iqq6kf0xmf.gjirafa.net/images/43da7b5b-e7d8-4613-8ded-012a4f505590/43da7b5b-e7d8-4613-8ded-012a4f505590.jpeg?w=1920"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default Slider