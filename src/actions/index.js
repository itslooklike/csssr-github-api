import axios from 'axios'
import pagiParser from 'github-pagination-parser'
import { API_GITHUB } from '../constants/Api'
import {
  SET_REPO_USERNAME,
  SET_REPO_REPONAME,
  ISSUES_FETCHING_START,
  ISSUES_FETCHING_END,
  SINGLE_ISSUE_FETCHING_START,
  SINGLE_ISSUE_FETCHING_END,
  SEARCH_USER_START,
  SEARCH_USER_END,
  SEARCH_REPO_START,
  SEARCH_REPO_END,
} from '../constants/ActionTypes'

export const setUserName = dispatch => userName => {
  dispatch({
    type: SET_REPO_USERNAME,
    payload: userName,
  })
}

export const setRepoName = dispatch => repoName => {
  dispatch({
    type: SET_REPO_REPONAME,
    payload: repoName,
  })
}

export const getIssues = dispatch => async (user, rep, amount, page) => {
  const url =
    API_GITHUB + `/repos/${user}/${rep}/issues?per_page=${amount}${page ? `&page=${page}` : ``}`

  dispatch({
    type: ISSUES_FETCHING_START,
  })

  const resp = await axios.get(url)
  const { data } = resp
  const pagination = pagiParser(resp.headers.link)

  dispatch({
    type: ISSUES_FETCHING_END,
    payload: { data, pagination },
  })
}

export const getSingleIssue = dispatch => async (user, rep, issueNumber) => {
  const url = API_GITHUB + `/repos/${user}/${rep}/issues/${issueNumber}`

  dispatch({
    type: SINGLE_ISSUE_FETCHING_START,
  })

  const { data } = await axios.get(url)

  dispatch({
    type: SINGLE_ISSUE_FETCHING_END,
    payload: { [issueNumber]: data },
  })
}

export const searchUser = dispatch => async user => {
  const url = API_GITHUB + `/search/users?q=${user}`

  dispatch({
    type: SEARCH_USER_START,
  })

  const { data } = await axios.get(url)

  console.log('☕️', data.items)

  dispatch({
    type: SEARCH_USER_END,
    payload: data.items,
  })
}

export const searchRepo = dispatch => async repo => {
  const url = API_GITHUB + `/search/repositories?q=${repo}`

  dispatch({
    type: SEARCH_REPO_START,
  })

  const { data } = await axios.get(url)

  dispatch({
    type: SEARCH_REPO_END,
    payload: data.items,
  })
}
