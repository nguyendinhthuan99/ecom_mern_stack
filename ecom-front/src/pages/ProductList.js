import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Products from '../component/Products'
import Newsletter from '../component/Newsletter'
import Announcement from '../component/Announcement'
import { mobile } from '../common/script/responsive'
import { useLocation } from 'react-router-dom'


const Container = styled.div`

`
const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({
    display: 'flex',
    flexDirection: 'column',
  })}
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({
    marginRight: '0px'
  })}
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({
    margin: '10px 0px'
  })}
`
const Option = styled.option`

`

const ProductList = () => {
  const [filters, setFilters] = useState({})

  const [sort, setSort] = useState('newest')

  const location = useLocation()

  const category = location.pathname.split('/')[2]

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>
        Mens wear
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Products:
          </FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option disabled selected value='' >Color</Option>
            <Option value='white'>White</Option>
            <Option value='black'>Black</Option>
            <Option value='gray'>Gray</Option>
            <Option value='fake'>fake</Option>
          </Select>
          <Select name='size' onChange={handleFilters}>
              <Option disabled selected value='' >Size</Option>
              <Option value='xs' >XS</Option>
              <Option value='s' >S</Option>
              <Option value='m' >M</Option>
              <Option value='l' >L</Option>
              <Option value='xl' >XL</Option>
              <Option value='fake' >fake</Option>
            </Select>
        </Filter>
        <Filter>
          <FilterText>
            Sort Products:
          </FilterText>
          <Select name='sort' onChange={ (e) => setSort(e.target.value) }>
              <Option disabled selected>Price</Option>
              <Option value='oldest'>Oldest</Option>
              <Option value='newest'>Newest</Option>
              <Option value='desc'>High to Low</Option>
              <Option value='asc'>Low to High</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
