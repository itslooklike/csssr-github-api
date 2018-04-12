import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as A from '../actions'
import * as S from '../selectors'

import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'
import Panel from 'muicss/lib/react/panel'

class SearchInput extends React.Component {
  state = {
    userName: 'facebook',
    repoName: 'react',
  }

  onChange(evt, stateName) {
    this.setState({ [stateName]: evt.target.value })
  }

  onSubmit(evt, fetchData, userName, repoName) {
    evt.preventDefault()
    fetchData(userName, repoName)
  }

  render() {
    const { fetchData, issues } = this.props
    const { fetching, data } = issues
    const { userName, repoName } = this.state

    return (
      <div>
        <Panel>
          <form onSubmit={evt => this.onSubmit(evt, fetchData, userName, repoName)}>
            <div>
              <Input
                label="enter user name"
                floatingLabel
                value={userName}
                onChange={evt => this.onChange(evt, 'userName')}
              />
            </div>
            <div>
              <Input
                label="enter repo name"
                floatingLabel
                value={repoName}
                onChange={evt => this.onChange(evt, 'repoName')}
              />
            </div>
            <div>
              <Button color="primary" disabled={fetching} type="submit">
                Search
              </Button>
            </div>
          </form>
        </Panel>
        {data && (
          <div>
            {data.map((item, index) => {
              const { number, title, created_at } = item
              return (
                <Panel key={index}>
                  <span>{number}</span>
                  <span>{title}</span>
                  <span>{created_at}</span>
                </Panel>
              )
            })}
          </div>
        )}
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
