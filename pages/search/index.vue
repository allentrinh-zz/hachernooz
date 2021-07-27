<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card class="mb-4">
        <v-card-title>Search</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
            @submit.prevent="fetchPosts"
          >
            <v-text-field
              v-model="query"
              label="Search"
              placeholder="Try searching for vuejs"
              required
            ></v-text-field>
            <v-btn
              color="primary"
              @click="fetchPosts"
            >
              Find some posts
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card v-show="data.length">
        <v-card-title>Results</v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.url`]="{ item }">
              <a :href="item.url" target="_blank">{{ item.url }}</a>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :centered="true"
      >
        Couldn't find anything for <strong>{{ query }}</strong>

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $axios, store, query }) {
    let data = []
    let snackbar = false

    if (Object.keys(query).length) {
      // Grab from the store if we've already queried this before
      const cached = store.state.posts.filter(posts => posts.query === query.query)
      if (cached.length > 0) {
        data = cached[0].posts
      } else {
        const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
        const response = await $axios.$get(`/search?${queryString}`)

        if (response.hits.length) {
          data = response.hits
          store.commit('storePosts', { query: query.query, posts: data })
        } else {
          snackbar = true
        }
      }
    }

    return {
      query: query.query,
      data,
      snackbar,
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title',
        },
        {
          text: 'Author',
          value: 'author',
        },
        {
          text: 'Date',
          value: 'created_at',
        },
        {
          text: 'URL',
          value: 'url',
        },
      ],
    }
  },
  methods: {
    async fetchPosts() {
      if (!this.query) {
        return false
      }

      // Grab from the store if we've already queried this before
      const cached = this.$store.state.posts.filter(posts => posts.query === this.query)
      if (cached.length > 0) {
        this.data = cached[0].posts
      } else {
        const response = await this.$axios.$get(`/search?query=${this.query}`)

        if (response.hits.length) {
          this.data = response.hits
          this.$store.commit('storePosts', { query: this.query, posts: this.data })
        } else {
          this.data = []
          this.snackbar = true
        }
      }
    },
  },
}
</script>
