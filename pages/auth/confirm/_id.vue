<template>
  <v-layout align-center>

    <v-flex xs12 sm6 offset-xs0 offset-sm3>
      <br><br>
      <blockquote>
        &#8220;Confirm.&#8221;
        <p> {{ msg }}</p>
        <footer>
          <small>
            <em>&mdash;Pharol</em>
          </small>
        </footer>

        <div class="">
          <h1>confirm token -> id ->  <span style="background: yellow">token {{ $route.params.id }}</span></h1>
        </div>

      </blockquote>
    </v-flex>

  </v-layout>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      msg: null,
    }
  },
  mounted: function() {
    console.log(this.$route.params.id);
    axios({
      method: 'get',
      url: `http://localhost:1337/auth/confirm/${this.$route.params.id}`,
    }).then(response => {
      console.log(response);
    })
    .catch((err) => {
      this.msg = 'user already exist!'
    });
  }
}
</script>
