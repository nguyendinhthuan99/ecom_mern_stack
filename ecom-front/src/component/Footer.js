import { Facebook, Instagram, LocalPhone, MailOutline, Pinterest, Place, Reddit, Telegram } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

import { mobile } from '../common/script/responsive'

const Container = styled.div`
  display: flex;
  ${mobile({
    flexDirection: 'column',
  })}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    display: 'none'
  })}
`
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    backgroundColor: '#E4F8F0'
  })}
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 20px;
`
const Logo = styled.h1`

`
const Description = styled.div`
  margin: 20px 0px;

`
const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  margin-right: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #${props => props.color};
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const Payment = styled.img`
  width: 50%;
`
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          AMUMU.
        </Logo>
        <Description>
          If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small
          sum to help pay for the hosting and bandwidth bill.
          There is no minimum donation,
          any sum is appreciated - click here to donate using PayPal.
        </Description>
        <SocialContainer>
          <SocialIcon color={'4267B2'}>
            <Facebook />
          </SocialIcon>
          <SocialIcon color={'f09433'}>
            <Instagram />
          </SocialIcon>
          <SocialIcon color={'ff4500'}>
            <Reddit />
          </SocialIcon>
          <SocialIcon color={'c8232c'}>
            <Pinterest />
          </SocialIcon>
          <SocialIcon color={'0088cc'}>
            <Telegram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>
          Useful Links
        </Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Whish List</ListItem>
          <ListItem>Term</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocalPhone style={{marginRight:"20px"}} />
          +84 0123 456 789
        </ContactItem>
        <ContactItem>
          <Place style={{marginRight:"20px"}}/>
          43 Nguyen Chi Thanh, Q5, Viet Nam
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"20px"}}/>
          admin@amumushop.vn
        </ContactItem>
        <Payment src='payment.png' />
      </Right>
    </Container>
  )
}

export default Footer
