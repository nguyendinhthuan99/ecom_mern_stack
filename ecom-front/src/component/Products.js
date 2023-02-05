import axios from 'axios'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import ProductItem from './ProductItem'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([])

  const [filteredProducts, setFilteredProducts] = useState([])

  const sortFunctions = {
    "newest": (arrProducts) =>
      [...arrProducts].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)),
    "oldest": (arrProducts) =>
      [...arrProducts].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    "asc": (arrProducts) =>
      [...arrProducts].sort((a,b) => a.price - b.price),
    "desc": (arrProducts) =>
      [...arrProducts].sort((a,b) => b.price - a.price),
  }

  const isFiltered = (filter, item) => {
    return Object.entries(filter).every(([key, value]) =>
      item[key].includes(value)
    )
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ?
          `http://localhost:5500/api/product?categories=${cat}` :
          `http://localhost:5500/api/product`
          )
        setProducts(res.data)
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getProducts()
  }, [cat])

  useEffect(() => {
    filters && setFilteredProducts(products.filter((item) =>
      isFiltered(filters, item))
    )
  }, [products, cat, filters])

  useEffect(() => {
    sort && setFilteredProducts((prev) => sortFunctions[sort](prev))
  }, [sort])

  return (
    <Container>
      { cat
        ? filteredProducts.map(item => (
            <ProductItem item={item} key={item.id} />
          ))
        : products.slice(0,12).map(item => (
            <ProductItem item={item} key={item.id} />
          ))
      }
    </Container>
  )
}

export default Products
