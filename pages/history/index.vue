<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card class="mb-4">
        <v-card-title>History</v-card-title>
        <v-card-text v-if="$store.state.posts.length === 0">
          <p>There are no recent searches to show.</p>
          <v-btn to="/search">Search now</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <template v-if="$store.state.posts.length > 0">
      <v-col cols="3">
        <v-card class="mb-4">
          <v-list>
            <v-subheader>Recent</v-subheader>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(query, i) in recentQueries"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="query" @click="setData(query)"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
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
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      selectedItem: null,
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
  computed: {
    recentQueries() {
      const queries = []
      this.$store.state.posts.forEach(posts => queries.push(posts.query))
      return queries
    }
  },
  methods: {
    setData(query) {
      const data = this.$store.state.posts.filter(posts => posts.query === query)
      this.data = data[0].posts
    }
  }
}
</script>
