import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import { useSelector } from 'react-redux'
import Search from '@mui/icons-material/Search'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'

import { mobile } from '../common/script/responsive'

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: '50px'
  })}
`
const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    padding: '10px 0px'
  })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({
    display: 'none'
  })}
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flex: 2,
    justifyContent: "space-around",
  })}
`
const Languages = styled.span`
  cursor: pointer;
  font-size: 14px;
`
const Input = styled.input`
  border: none;
`
const SearchContainer = styled.div`
  padding: 5px;
  display: flex;
  margin-left: 25px;
  align-items: center;
  border: 0.5px solid lightgray;
`
const Logo = styled.h1`
  font-weight: 900;
  ${mobile({
    fontSize: '24px'
  })}
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({
    fontSize: '12px',
    marginLeft: '10px'
  })}
`

const Navbar = () => {
  const quantity = useSelector(state => state?.cart?.quantity)

  return (
    <Container>
      <Wrapper>
        <Left>
          <Languages>
            EN
          </Languages>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            AMUMU.
          </Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
