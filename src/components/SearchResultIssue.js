const SearchResultIssue = props => {
  const { number } = props.match.params
  console.log(props)
  return number
}

export default SearchResultIssue
