<template>
  <v-app light>
    <header-component/>
    <nuxt/>
    <notifications></notifications>
    <footer-component/>
  </v-app>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    'header-component': Header,
    'footer-component': Footer
  },
}
</script>

<style>

</style>
