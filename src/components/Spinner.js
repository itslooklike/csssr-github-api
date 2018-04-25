import React from 'react'
import styled from 'styled-components'
import { ClimbingBoxLoader } from 'react-spinners'

const SpinnerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Spinner = () => (
  <SpinnerWrap>
    <ClimbingBoxLoader />
  </SpinnerWrap>
)

export default Spinner
