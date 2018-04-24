import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Panel from 'muicss/lib/react/panel'
import * as A from '../actions'
import * as S from '../selectors'

class SearchResultIssue extends React.Component {
  componentDidMount () {
    const { userName, repoName, getSingleIssue } = this.props
    const { number } = this.props.match.params
    getSingleIssue(userName, repoName, number)
  }

  render () {
    const { number } = this.props.match.params
    return <Panel>{number}</Panel>
  }
}

SearchResultIssue.propTypes = {
  match: PropTypes.object,
  userName: PropTypes.string,
  repoName: PropTypes.string,
  getSingleIssue: PropTypes.func,
}

const MSTP = state => ({
  userName: S.userName(state),
  repoName: S.repoName(state),
})

const MDTP = dispatch => ({
  getSingleIssue: A.getSingleIssue(dispatch),
})

export default connect(MSTP, MDTP)(SearchResultIssue)
