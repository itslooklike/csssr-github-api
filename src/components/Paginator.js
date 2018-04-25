import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import * as A from '../actions'
import * as S from '../selectors'

const Paginator = props => {
  const { userName, repoName, peerPageAmount, getIssues } = props
  const { first, prev, next, last } = props.pagination
  const { fetching } = props.issues

  const fetchIssues = page => getIssues(userName, repoName, peerPageAmount, page)

  return (
    <div>
      <Panel>
        {first && (
          <Button
            disabled={fetching}
            variant='raised'
            color='accent'
            onClick={() => fetchIssues(first)}
          >
            first
          </Button>
        )}
        {prev && (
          <Button
            disabled={fetching}
            variant='raised'
            color='accent'
            onClick={() => fetchIssues(prev)}
          >
            prev
          </Button>
        )}
        {next && (
          <Button
            disabled={fetching}
            variant='raised'
            color='accent'
            onClick={() => fetchIssues(next)}
          >
            next
          </Button>
        )}
        {last && (
          <Button
            disabled={fetching}
            variant='raised'
            color='accent'
            onClick={() => fetchIssues(last)}
          >
            last
          </Button>
        )}
      </Panel>
    </div>
  )
}

Paginator.propTypes = {
  userName: PropTypes.string,
  repoName: PropTypes.string,
  pagination: PropTypes.object,
  peerPageAmount: PropTypes.number,
  getIssues: PropTypes.func,
  issues: PropTypes.object,
}

const mapState = state => ({
  userName: S.userName(state),
  repoName: S.repoName(state),
  issues: S.issues(state),
  pagination: S.pagination(state),
})

const mapDispatch = dispatch => ({
  getIssues: A.getIssues(dispatch),
})

export default connect(mapState, mapDispatch)(Paginator)
