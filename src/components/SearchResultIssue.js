import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Panel from 'muicss/lib/react/panel'
import Spinner from './Spinner'
import * as A from '../actions'
import * as S from '../selectors'

const Wrap = styled.div`
  display: flex;
`

const Img = styled.img`
  flex: 0 0 auto;
  width: 100px;
  height: 100px;
`

const Content = styled.div`
  margin-left: 10px;
`
const Author = styled.div`
  text-align: center;
`
const Title = styled.h2`
  margin: 0 0 20px;
`
const Text = styled.p``

class SearchResultIssue extends React.Component {
  componentDidMount () {
    const { userName, repoName, getSingleIssue } = this.props
    const { number } = this.props.match.params
    getSingleIssue(userName, repoName, number)
  }

  render () {
    const { data, fetching } = this.props.singleIssue
    const { title, body } = data || {}
    const { avatar_url: avatar, html_url: profile, login } = (data && data.user) || {}

    return (
      <div>
        {fetching ? (
          <Spinner />
        ) : (
          <Panel>
            <Wrap>
              <a href={profile} target='_blank'>
                <Img src={avatar} />
                <Author>{login}</Author>
              </a>
              <Content>
                <Title>{title}</Title>
                <Text>{body}</Text>
              </Content>
            </Wrap>
          </Panel>
        )}
      </div>
    )
  }
}

SearchResultIssue.propTypes = {
  match: PropTypes.object,
  userName: PropTypes.string,
  repoName: PropTypes.string,
  singleIssue: PropTypes.object,
  getSingleIssue: PropTypes.func,
}

const MSTP = state => ({
  userName: S.userName(state),
  repoName: S.repoName(state),
  singleIssue: S.singleIssue(state),
})

const MDTP = dispatch => ({
  getSingleIssue: A.getSingleIssue(dispatch),
})

export default connect(MSTP, MDTP)(SearchResultIssue)
