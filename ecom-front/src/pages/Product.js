import React from 'react'
// import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Add, Remove } from '@mui/icons-material'

import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { addProduct } from '../redux/cartRedux'
import Newsletter from '../component/Newsletter'
import { publicRequest } from '../common/request'
import { mobile } from '../common/script/responsive'
import Announcement from '../component/Announcement'



const Container = styled.div`

`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    flexDirection: 'column',
    padding: '10px',
  })}
`
const ImgContainer = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({
    height: '40vh'
  })}
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({
    padding: '10px',
  })}
`
const Title = styled.h1`
  font-weight: 200;
`
const Description = styled.p`
  margin: 20px 0px;
`
const Price = styled.span`
  font-size: 40px;
  font-weight: 100;
`
const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  ${mobile({
    width: '100%'
  })}
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 5px;
  cursor: pointer;
  border-radius: 50%;
  border: 0.5px solid gray;
  background-color: ${props => props.color };
`
const FilterSize = styled.select`
  padding: 5px;
  margin-left: 10px;
  border: 0.5px solid teal;
`
const FilterSizeOpiton = styled.option`

`
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    width: '100%'
  })}
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid teal;
`
const Button = styled.button`
  padding: 15px;
  cursor: pointer;
  font-weight: 500;
  background-color: white;
  border: 2px solid teal;

  &:hover {
    color: white;
    background-color: teal;
  }
`
const Product = () => {
  const location = useLocation()

  const dispatch = useDispatch()

  const [size, setSize] = useState('')

  const [color, setColor] = useState('')

  const id = location.pathname.split('/')[2]

  const [product, setProducts] = useState({})

  const [quantity, setQuantity] = useState(1)

  const handleQuantity = (type) => {
    if (type === 'up') {
      setQuantity(quantity + 1)
    } else {
      quantity > 1 && setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
        color,
        size,
      })
    )
  }

  useEffect(() => {
    const getProducts = async() => {
      try {
        const res = await publicRequest.get(`/product/${id}`)
        setProducts(res.data)
      }
      catch(err) {
        console.log('Product.js', err.message)
      }
    }
    getProducts()
  }, [id])

  return (
    <Container>
      <Navbar />
      <Announcement />
        <Wrapper>
          <ImgContainer>
            <Image  src={product?.img}/>
          </ImgContainer>
          <InfoContainer>
            <Title>
              {product?.title}
            </Title>
            <Description>
              {product?.desc}
            </Description>
            <Price>
              ${product?.price}
            </Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product?.color?.map(c =>
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                )}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product?.size?.map(s =>
                    <FilterSizeOpiton key={s}>{s.toUpperCase()}</FilterSizeOpiton>
                  )}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity('down')} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity('up')} />
              </AmountContainer>
              <Button onClick={handleAddToCart}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product
