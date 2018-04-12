import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import Panel from 'muicss/lib/react/panel'

const IssueNumber = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`

const IssueText = styled.div`
  color: black;
`

const IssueDate = styled.div`
  margin-top: 4px;
  color: grey;
  font-size: 0.7em;
  font-weight: bold;
`

const dateFormat = date => {
  const jsDate = parse(date)
  const formatedDate = format(jsDate, 'YY/MM/DD HH:mm')
  return formatedDate
}

const SearchResultList = props => {
  const { data } = props

  return (
    <div>
      {data.map((item, index) => {
        const { number, title, created_at: created, id } = item

        return (
          <Panel key={id}>
            <IssueNumber>{number}</IssueNumber>
            <IssueText>{title}</IssueText>
            <IssueDate>{dateFormat(created)}</IssueDate>
          </Panel>
        )
      })}
    </div>
  )
}

SearchResultList.propTypes = {
  data: PropTypes.array,
}

export default SearchResultList