import styled from 'styled-components'
import React, { useState } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { sliderItems } from '../fakedata/data.js'
import { mobile } from '../common/script/responsive.js'

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  overflow: hidden;
  position: relative;
  ${mobile({
    display: 'none'
  })}
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${ props => props.slideIndex * (-100) }vw);
`
const Arrow = styled.div`
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 50px;
  margin: auto;
  height: 50px;
  opacity: 0.5;
  display: flex;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #fff7f7;
  left: ${ props => props.direction === 'left' && '10px' };
  right: ${ props => props.direction === 'right' && '10px' };
`

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #${ props => props.bg };
`
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`
const Image = styled.img`
  height: 100%;
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`
const Title = styled.h1`
  flex: 1;
  font-size: 50px;
`
const Desc = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 50px 0px;
  letter-spacing: 5px;
`
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
`

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  const handleSliderClick = (direction) => {
    if(direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    }
    else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }
  return (
    <Container>
      <Arrow direction='left' onClick={() => handleSliderClick('left')}>
        <KeyboardArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        { sliderItems.map(item => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img}/>
            </ImgContainer>
            <InfoContainer>
              <Title>
                {item.title}
              </Title>
              <Desc>
                {item.desc}
              </Desc>
              <Button>
                SHOP NOW
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleSliderClick('right')}>
        <KeyboardArrowRight />
      </Arrow>
    </Container>
  )
}

export default Slider
