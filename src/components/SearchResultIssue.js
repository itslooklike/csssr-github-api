import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import idx from 'idx'
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

class SearchResultIssue extends React.Component {
  componentDidMount () {
    const { userName, repoName, getSingleIssue } = this.props
    const { number } = this.props.match.params

    // загружался ли ишу ранее?
    if (idx(this.props, _ => _.singleIssue.data[number])) return

    getSingleIssue(userName, repoName, number)
  }

  render () {
    const { number } = this.props.match.params
    const { fetching } = this.props.singleIssue
    const { title, body } = idx(this.props.singleIssue, _ => _.data[number]) || {}
    const { avatar_url: avatar, html_url: profileLink, login } =
      idx(this.props.singleIssue, _ => _.data[number].user) || {}

    return (
      <div>
        {fetching ? (
          <Spinner />
        ) : (
          <Panel>
            <Wrap>
              <a href={profileLink} target='_blank'>
                <Img src={avatar} />
                <Author>{login}</Author>
              </a>
              <Content>
                <Title>{title}</Title>
                <div>
                  <ReactMarkdown source={body} />
                </div>
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
