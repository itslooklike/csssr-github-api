import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Container from 'muicss/lib/react/container'
import SearchInput from '../components/SearchInput'
import SearchResultList from '../components/SearchResultList'
import SearchResultIssue from '../components/SearchResultIssue'
import * as S from '../selectors'

const PageMain = props => {
  const { data } = props.issues

  return (
    <Container>
      <Route path='/' exact component={SearchInput} />
      <Route path='/issue/:number' component={SearchResultIssue} />
      {data && <SearchResultList data={data} />}
    </Container>
  )
}

PageMain.propTypes = {
  issues: PropTypes.object,
}

const mapStateToProps = state => ({
  issues: S.issues(state),
})

export default connect(mapStateToProps)(PageMain)
