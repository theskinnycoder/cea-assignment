import { FormControl } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setSearchText } from "../postsSlice"

const SearchBar = () => {
  const { searchText } = useSelector(state => state.posts)
  const dispatch = useDispatch()

  return (
    <FormControl
      placeholder="Search for posts' titles"
      size="lg"
      autoFocus={true}
      className="border border-5 border-secondary shadow-none mt-5"
      value={searchText}
      onChange={e => dispatch(setSearchText(e.target.value))}
    />
  )
}

export default SearchBar
