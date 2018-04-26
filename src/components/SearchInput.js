import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'
import Panel from 'muicss/lib/react/panel'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'
import SearchResultList from './SearchResultList'
import Paginator from './Paginator'
import * as A from '../actions'
import * as S from '../selectors'

const defaultIssuesAmount = 5

class SearchInput extends React.Component {
  constructor() {
    super()

    this.state = {
      peerPageAmount: defaultIssuesAmount,
    }
  }

  onChange(evt, type) {
    const { setUserName, setRepoName, searchUser, searchRepo } = this.props
    const { value } = evt.target
    const timeout = 500

    if (type === 'user') {
      setUserName(value)
      searchUser(value)
      // debounce(() => searchUser(value), timeout)
    } else if (type === 'repo') {
      setRepoName(value)
      searchRepo(value)
      // debounce(() => searchRepo(value), timeout)
    }
  }

  onSubmit(evt, getIssues, userName, repoName, peerPageAmount) {
    evt.preventDefault()
    getIssues(userName, repoName, peerPageAmount)
  }

  onSelectChange = evt => {
    this.setState({ peerPageAmount: evt.target.value })
  }

  render() {
    const { peerPageAmount } = this.state
    const { userName, repoName, getIssues } = this.props
    const { fetching, data, pagination } = this.props.issues
    const isPagNotEmpty = Object.keys(pagination).length > 0

    return (
      <div>
        <Panel>
          <form onSubmit={evt => this.onSubmit(evt, getIssues, userName, repoName, peerPageAmount)}>
            <div>
              <Input
                label="enter user name"
                floatingLabel
                value={userName}
                onChange={evt => this.onChange(evt, 'user')}
              />
            </div>
            <div>
              <Input
                label="enter repo name"
                floatingLabel
                value={repoName}
                onChange={evt => this.onChange(evt, 'repo')}
              />
            </div>
            <div>
              <Select
                name="amount"
                label="Select Amount"
                defaultValue={defaultIssuesAmount}
                onChange={this.onSelectChange}
              >
                <Option value={defaultIssuesAmount} label={defaultIssuesAmount} />
                <Option value="25" label="25" />
                <Option value="50" label="50" />
                <Option value="100" label="100" />
              </Select>
            </div>
            <div>
              <Button color="primary" disabled={fetching} type="submit">
                Search
              </Button>
            </div>
          </form>
        </Panel>

        {isPagNotEmpty && <Paginator peerPageAmount={peerPageAmount} />}

        {data && <SearchResultList data={data} />}
      </div>
    )
  }
}

SearchInput.propTypes = {
  userName: PropTypes.string,
  repoName: PropTypes.string,
  issues: PropTypes.object,
  setUserName: PropTypes.func,
  setRepoName: PropTypes.func,
  getIssues: PropTypes.func,
  searchUser: PropTypes.func,
  searchRepo: PropTypes.func,
}

const mapState = state => ({
  userName: S.userName(state),
  repoName: S.repoName(state),
  issues: S.issues(state),
  pagination: S.pagination(state),
})

const mapDispatch = dispatch => ({
  setUserName: A.setUserName(dispatch),
  setRepoName: A.setRepoName(dispatch),
  getIssues: A.getIssues(dispatch),
  searchUser: A.searchUser(dispatch),
  searchRepo: A.searchRepo(dispatch),
})

export default connect(mapState, mapDispatch)(SearchInput)
