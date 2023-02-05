import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { mobile } from '../common/script/responsive'


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({
    height: '20vh'
  })}
`
const Info = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`
const Button = styled.button`
  color: gray;
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: white;
  font-weight: 600;
`

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Info>
          <Title>
            {item.title}
          </Title>
          <Button>
            SHOP NOW
          </Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem
