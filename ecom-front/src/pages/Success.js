import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { userRequest } from '../common/request'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: teal;
`

const Success = () => {
  const location = useLocation()

  const data = location.state?.stripeData;

  const cart = location.state?.cart;

  const currentUser = useSelector((state) => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);

  data && console.log(data)

  console.log({ currentUser, data })

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/order", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id)
        console.log(res)
      } catch (err){
        console.log('Success page: ', err)
      }
    }
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Button>
        <Link to='/' style={{color: 'white'}}>
          Go to Homepage
        </Link>
      </Button>
    </Container>
  );
}

export default Success