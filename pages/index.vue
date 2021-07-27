<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Explore HacherNooz
        </v-card-title>
        <v-card-text>
          <p>Try a quick search</p>
          <v-btn
            v-for="button in quickSearch"
            :key="button.text"
            :to="`/search?query=${button.text}`"
            :color="button.color"
            class="mr-2">
            {{ button.text }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      quickSearch: [
        {
          text: 'vuejs',
          color: '#41b783',
        },
        {
          text: 'reactjs',
          color: '#61dafb',
        },
        {
          text: 'javascript',
          color: '#fcdc00',
        },
        {
          text: 'html',
          color: '#dd4b24',
        },
        {
          text: 'css',
          color: '#244bdc',
        },
      ],
    }
  },
}
</script>
