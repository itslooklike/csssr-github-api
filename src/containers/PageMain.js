import React from 'react'
import { Route } from 'react-router-dom'

import Container from 'muicss/lib/react/container'

import SearchInput from '../components/SearchInput'
import SearchResultIssue from '../components/SearchResultIssue'

const PageMain = props => {
  return (
    <Container>
      <Route path='/' exact component={SearchInput} />
      <Route path='/issue/:number' component={SearchResultIssue} />
    </Container>
  )
}

export default PageMain
