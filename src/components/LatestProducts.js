
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function LatestProducts() {
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=12')
        .then(resp => setLatestProducts(resp.data.products))
    }, [])

    return (
        <section className="pt-5">
            <div className="container">
                <div className="mb-5">
                    <h2 className="text-center">Latest products</h2>
                </div>
                <div className="row">
                    {
                        latestProducts.map(product => (
                            <div className="col-md-3 col-sm-12" key={product.id}>
                                <ProductCard {...product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestProducts