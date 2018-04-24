import axios from 'axios'
import { API_GITHUB } from '../constants/Api'
import {
  SET_REPO_USERNAME,
  SET_REPO_REPONAME,
  ISSUES_FETCHING_START,
  ISSUES_FETCHING_END,
  SINGLE_ISSUE_FETCHING_START,
  SINGLE_ISSUE_FETCHING_END,
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

export const getIssues = dispatch => async (user, rep, amount) => {
  const url = API_GITHUB + `/repos/${user}/${rep}/issues?per_page=${amount}`

  dispatch({
    type: ISSUES_FETCHING_START,
  })

  const { data } = await axios.get(url)

  dispatch({
    type: ISSUES_FETCHING_END,
    payload: data,
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
    payload: data,
  })
}
