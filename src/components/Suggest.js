import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: absolute;
  max-width: 400px;
  width: 100%;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%);
`

const Suggest = props => {
  const { data } = props
  const spliced = data.splice(0, 5)

  return (
    <Wrap>
      {spliced.map((item, idx) => {
        const { login } = item
        return <div key={idx}>{login}</div>
      })}
    </Wrap>
  )
}

export default Suggest
