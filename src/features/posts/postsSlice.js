import { createSlice } from "@reduxjs/toolkit"
import {
  createPost,
  deletePostByID,
  dislikePostByID,
  editPostByID,
  fetchPostByID,
  fetchPosts,
  likePostByID
} from "./postsThunks"

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: "",
    searchText: "",
    likedPosts: [],
    dislikedPosts: [],
    post: {}
  },
  reducers: {
    setSearchText: (state, { payload }) => {
      state.searchText = payload
    }
  },
  extraReducers: {
    // -- FETCH ALL POSTS
    [fetchPosts.pending]: (state, _) => {
      state.loading = true
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload
      state.likedPosts = payload.filter(post => post.liked === true)
      state.dislikedPosts = payload.filter(post => post.disliked === true)
      state.loading = false
    },
    [fetchPosts.rejected]: (state, _) => {
      state.error = "Couldn't fetch the posts"
      state.loading = false
    },

    // -- FETCH POST BY ID
    [fetchPostByID.pending]: (state, _) => {
      state.loading = true
    },
    [fetchPostByID.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.post = payload
    },
    [fetchPostByID.rejected]: (state, _) => {
      state.loading = false
      state.error = "Couldn't fetch the post"
    },

    // -- CREATE A NEW POST
    [createPost.pending]: (state, _) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts = [payload, ...state.posts]
      state.loading = false
    },
    [createPost.rejected]: (state, _) => {
      state.loading = false
      state.error = "Couldn't create the post"
    },

    // -- EDIT POST BY ID
    [editPostByID.pending]: (state, _) => {
      state.loading = true
    },
    [editPostByID.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = state.posts.map(post =>
        post.id === payload.id ? payload : post
      )
    },
    [editPostByID.rejected]: (state, _) => {
      state.loading = false
      state.error = "Couldn't edit the post"
    },

    // -- DELETE POST BY ID
    [deletePostByID.pending]: (state, _) => {
      state.loading = true
    },
    [deletePostByID.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = state.posts.filter(post => post.id !== payload.id)
    },
    [deletePostByID.rejected]: (state, _) => {
      state.loading = false
      state.error = "Couldn't delete the post"
    },

    // -- LIKE POST BY ID
    [likePostByID.pending]: (state, _) => {
      state.loading = true
    },
    [likePostByID.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.post.liked = payload.liked
      if (state.post.disliked) state.post.disliked = false
    },
    [likePostByID.rejected]: (state, _) => {
      state.loading = false
      state.error = "Couldn't like the post"
    },

    // -- DISLIKE POST BY ID
    [dislikePostByID.pending]: (state, _) => {
      state.loading = true
    },
    [dislikePostByID.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.post.disliked = payload.disliked
      if (state.post.liked) state.post.liked = false
    },
    [dislikePostByID.rejected]: (state, _) => {
      state.loading = false
      state.error = "Couldn't dislike the post"
    }
  }
})

export default postsSlice.reducer

export const { setSearchText } = postsSlice.actions
