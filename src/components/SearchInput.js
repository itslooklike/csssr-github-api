import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchResultList from './SearchResultList'
import * as A from '../actions'
import * as S from '../selectors'
import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'
import Panel from 'muicss/lib/react/panel'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'

const defaultIssuesAmount = 5

class SearchInput extends React.Component {
  constructor () {
    super()

    this.state = {
      userName: 'facebook',
      repoName: 'react',
      peerPageAmount: defaultIssuesAmount,
    }

    this.onSelectChange = this.onSelectChange.bind(this)
  }

  onChange (evt, stateName) {
    this.setState({ [stateName]: evt.target.value })
  }

  onSubmit (evt, fetchData, userName, repoName, peerPageAmount) {
    evt.preventDefault()
    fetchData(userName, repoName, peerPageAmount)
  }

  onSelectChange (evt) {
    this.setState({ peerPageAmount: evt.target.value })
  }

  render () {
    const { userName, repoName, peerPageAmount } = this.state
    const { fetchData, issues: { fetching, data } } = this.props

    return (
      <div>
        <Panel>
          <form onSubmit={evt => this.onSubmit(evt, fetchData, userName, repoName, peerPageAmount)}>
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
              <Select
                name='amount'
                label='Select Amount'
                defaultValue={defaultIssuesAmount}
                onChange={this.onSelectChange}
              >
                <Option value={defaultIssuesAmount} label={defaultIssuesAmount} />
                <Option value='25' label='25' />
                <Option value='50' label='50' />
                <Option value='100' label='100' />
              </Select>
            </div>
            <div>
              <Button color='primary' disabled={fetching} type='submit'>
                Search
              </Button>
            </div>
          </form>
        </Panel>
        {data && (
          <div>
            <Panel>
              <div className='mui--text-dark-secondary'>Founded: {data.length} issue</div>
            </Panel>
            <SearchResultList data={data} />
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
