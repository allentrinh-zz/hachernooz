export const state = () => ({
  posts: [],
})

export const mutations = {
  storePosts(state, payload) {
    // Check if we've already queried this before pushing it to state.posts
    const hasPosts = state.posts.filter(posts => posts.query === payload.query).length > 0
    if (!hasPosts) {
      state.posts.push({
        query: payload.query,
        posts: payload.posts,
      })
    }
  },
}
