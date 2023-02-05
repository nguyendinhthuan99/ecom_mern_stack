import React from 'react'
import styled from 'styled-components'
import { FavoriteBorderOutlined, InfoOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Info = styled.div`
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  position: absolute;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  background-color: rgba(0, 0, 0, 0.1);
`
const Container = styled.div`
  flex: 1;
  margin: 5px;
  display: flex;
  height: 350px;
  min-width: 280px;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #E4F8F0;

  &:hover ${ Info } {
    opacity: 1;
  }
`
const Image = styled.img`
  height: 75%;
  z-index: 2;
`
const Icon = styled.div`
  margin: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  transition: all 0.5s ease;
  justify-content: center;
  background-color: white;

  &:hover {
    background-color: #8EE2BF;
    transform: scale(1.1);
  }
`


const ProductItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <InfoOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  )
}

export default ProductItem
