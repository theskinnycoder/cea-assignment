import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { v4 } from "uuid"

axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json;odata.metadata=full",
  "Content-Type": "application/json"
}
axios.defaults.baseURL =
  "my-json-server.typicode.com/theskinnycoder/cea-assignment/posts"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return (await axios.get("/")).data
})

export const fetchPostByID = createAsyncThunk(
  "posts/fetchPostByID",
  async ({ id }) => {
    return (await axios.get(`/${id}`)).data
  }
)

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, body }) => {
    return (
      await axios.post("/", {
        id: v4(),
        title,
        body,
        liked: false,
        disliked: false
      })
    ).data
  }
)

export const editPostByID = createAsyncThunk(
  "posts/editPostByID",
  async ({ id, title, body }) => {
    return (
      await axios.patch(`/${id}`, {
        title,
        body
      })
    ).data
  }
)

export const deletePostByID = createAsyncThunk(
  "posts/deletePostByID",
  async ({ id }) => {
    return (await axios.delete(`/${id}`)).data
  }
)

export const likePostByID = createAsyncThunk(
  "posts/likePost",
  async ({ id, liked }) => {
    return (
      await axios.patch(`/${id}`, {
        liked: !liked,
        disliked: false
      })
    ).data
  }
)

export const dislikePostByID = createAsyncThunk(
  "posts/dislikePost",
  async ({ id, disliked }) => {
    return (
      await axios.patch(`/${id}`, {
        disliked: !disliked,
        liked: false
      })
    ).data
  }
)
