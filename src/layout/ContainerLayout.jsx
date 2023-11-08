import React from 'react'
import { styled } from '@mui/system';

export const Container = styled('main')({
  width: '100%',
  height: '100vh',
  maxWidth: '1400px',
  margin: "0 auto",
  padding: "0 10px"
})

const ContainerLayout = ({ children }) => {
  return (
    <Container>{children}</Container>
  )
}

export default ContainerLayout