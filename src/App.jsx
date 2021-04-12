import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Header } from "./components"
import {
  CreatePost,
  DisplayPosts,
  EditPost,
  PostDetails
} from "./features/posts/screens"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={DisplayPosts} />
        <Route exact path="/posts" component={DisplayPosts} />
        <Route exact path="/add" component={CreatePost} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route exact path="/posts/:id/edit" component={EditPost} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
