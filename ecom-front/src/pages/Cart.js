import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Add, Remove } from '@mui/icons-material'
import StripeCheckout from 'react-stripe-checkout'
import { useNavigate } from 'react-router-dom'

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Announcement from '../component/Announcement'
import { mobile } from '../common/script/responsive'
import { userRequest } from '../common/request'

const PUBLIC_STRIPE_KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`

`
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: '10px',
  })}
`
const Title = styled.div`
  font-size: 40px;
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    display: 'none'
  })}
`
const TopButton = styled.button`
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  background-color: ${props =>
    props.type === 'filled' ? 'black' : 'teal'};
  color: white;
`
const  Toptexts = styled.div`

`
const Toptext = styled.span`
  cursor: pointer;
  margin: 0px 10px;
  text-decoration: underline;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
  })}
`
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
  })}
`
const ProoductDetail = styled.div`
  flex: 2;
  display: flex;
`
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${mobile({
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '10px'
  })}
`
const Image = styled.img`
  width: 200px;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({
    marginBottom: '0px',
  })}
`
const ProductAmount = styled.div`
  margin: 5px;
  font-size: 20px;
`
const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
`
const Hr = styled.hr`
  height: 1px;
  border: none;
  background-color: #eee;
`
const ProductName = styled.span`

`
const ProductId = styled.span`

`
const ProductSize = styled.span`

`
const ProductColorWrapper = styled.span`
  display: flex;
`
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`
const Summary = styled.div`
  flex: 1;
  padding: 20px;
  height: 50vh;
  border-radius: 10px;
  border: 0.5px solid lightgray;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItemPrice = styled.span`

`
const SummaryItemText = styled.span`

`
const SummaryItem = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  font-weight: ${props =>
    props.type === 'total' && '500' };
  font-size:  ${props =>
    props.type === 'total' && '24px' };;
`
const SummaryButton = styled.button`
  width: 100%;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  background-color: black;
`

const Cart = () => {
  const cart = useSelector(state => state.cart)

  const [stripeToken, setStripeToken] = useState(null)

  const navigate = useNavigate()

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try{
        const res = await userRequest.post("/stripe/payment", {
          tokenId: stripeToken.id,
          amount:  cart?.total <= 0 ? 1  : cart.total,
        })

        navigate('/success', {
          state: {
            stripeData: res.data,
            cart
          }
        })
      }
      catch (e) {
        console.log('Cart.useEffect.stripeToken: ', e?.message)
      }
    }

    stripeToken && makeRequest()
  }, [stripeToken, cart.total,  navigate])

  console.log(cart)
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>
          YOUR BAG
        </Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <Toptexts>
            <Toptext>Shopping bag(2)</Toptext>
            <Toptext>Your wishlist(3)</Toptext>
          </Toptexts>
          <TopButton type='filled'>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProoductDetail>
                  <Image src ={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>Id: </b>
                      {product._id}
                    </ProductId>
                    <ProductColorWrapper>
                      <b>Color: </b>
                      <ProductColor color={product.color} />
                    </ProductColorWrapper>
                    <ProductSize>
                      <b>Size: </b>
                      {product.size}
                    </ProductSize>
                  </Details>
                </ProoductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>
                      {product.quantity}
                    </ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {+product.price * +product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <Hr />
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='Amumu Shop'
              image='logo.png'
              billingAddress
              shippingAddress
              descripton={`Your total is ${cart.total}`}
              amout={cart.total}
              token={onToken}
              stripeKey={PUBLIC_STRIPE_KEY}
            >
              <SummaryButton>CHECKOUT NOW</SummaryButton>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart