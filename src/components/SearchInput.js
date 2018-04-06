import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as A from '../actions'
import * as S from '../selectors'

import Button from 'muicss/lib/react/button'
import Input from 'muicss/lib/react/input'
import Panel from 'muicss/lib/react/panel'

class SearchInput extends React.Component {
  render () {
    const { fetchData, issues } = this.props
    const { fetching, data } = issues

    return (
      <div>
        <Panel>
          <div>
            <Input label='enter repo name' floatingLabel />
          </div>
          <div>
            <Button color='primary' onClick={fetchData} disabled={fetching}>
              Search
            </Button>
          </div>
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
  fetchData: A.onSearchStart(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
