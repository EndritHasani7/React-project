import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

function Shop() {
   const[search, setSearch] = useState()
  const [categories, setCategories] = useState()
  const [category, setCategory] = useState()
  const [products, setProducts] = useState()

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/categories`)
    .then(resp => setCategories(resp.data))

    axios.get(`https://dummyjson.com/products?limit=40`)
    .then(resp => setProducts(resp.data.products))
  }, []);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${category}`)
    .then(resp => setProducts(resp.data.products))
  }, [category])


  useEffect(() => {
    if(search) {
      axios.get(`https://dummyjson.com/products/search?q=${search}`)
      .then(resp => setProducts(resp.data.products))
    }
  }, [search])


  const handleSearch = e => {
    e.preventDefault()
    const q = e.target.value

    switch(e.keyCode) {
      case 13:
        setSearch(q)
        break;
    }
  }

  const handleCategoryChange = e => {
    if(e.target.value.length > 0) {
      setCategory(e.target.value)
    }
  }

  return (
    <>
      <section className="container mt-4">
        <div className="row">
          <div className="col-6">
            <input type="search" className="form-control w-75" placeholder="Search products by title" onKeyUp={handleSearch} />
          </div>
          <div className="col-6">
            {categories && <select className="form-control w-25 ms-auto" onChange={handleCategoryChange}>
              <option value="">Select category</option>
              {
                categories.map((category, key) => <option key={key} value={category}>{category}</option>)
              }
            </select>}
          </div>
        </div>
      </section>

      <section className="pt-5">
            <div className="container">
                <div className="row">
                    {
                        products && products.map(product => (
                        <div className="col-md-3 col-sm-12" key={product.id}>
                            <ProductCard {...product} />
                        </div>
                        ))
                    }
                </div>
            </div>
        </section>
    </>
  )
}

export default Shop