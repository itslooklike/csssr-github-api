import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchResultList from './SearchResultList'
import * as A from '../actions'
import * as S from '../selectors'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'
import Panel from 'muicss/lib/react/panel'

class SearchInput extends React.Component {
  constructor () {
    super()
    this.state = {
      userName: 'facebook',
      repoName: 'react',
    }
  }

  onChange (evt, stateName) {
    this.setState({ [stateName]: evt.target.value })
  }

  onSubmit (evt, fetchData, userName, repoName) {
    evt.preventDefault()
    fetchData(userName, repoName)
  }

  render () {
    const { userName, repoName } = this.state
    const { fetchData, issues } = this.props
    const { fetching, data } = issues

    return (
      <div>
        <Panel>
          <form onSubmit={evt => this.onSubmit(evt, fetchData, userName, repoName)}>
            <div>
              <Input
                label='enter user name'
                floatingLabel
                value={userName}
                onChange={evt => this.onChange(evt, 'userName')}
              />
            </div>
            <div>
              <Input
                label='enter repo name'
                floatingLabel
                value={repoName}
                onChange={evt => this.onChange(evt, 'repoName')}
              />
            </div>
            <div>
              <Button color='primary' disabled={fetching} type='submit'>
                Search
              </Button>
            </div>
          </form>
        </Panel>
        {data && <SearchResultList data={data} />}
      </div>
    )
  }
}

SearchInput.propTypes = {
  fetchData: PropTypes.func,
  issues: PropTypes.object,
}

const mapStateToProps = state => ({
  issues: S.issues(state),
})

const mapDispatchToProps = dispatch => ({
  fetchData: A.getIssues(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
