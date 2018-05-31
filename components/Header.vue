<template>
  <div v-if="auth != false">
    <!-- MENU LATERAL-->
    <v-navigation-drawer
      app
      fixed
      v-model="sideNavLeft"
      :mini-variant="showShortMenu"
      :clipped="clipped"
    >
      <v-list>
        <v-list-tile
          v-for="item in menuOptions"
          :key="item.title"
          router
          :to="item.path"
          exact
        >
          <v-list-tile-action>
            <v-icon light>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> {{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- BARRA SUPERIOR -->
    <v-toolbar
      app
      fixed
      :clipped-left="clipped"
    >
      <!-- BOTON MENU IZQUIERDO -->
      <v-toolbar-side-icon
        @click.stop="sideNavLeft = !sideNavLeft"
        light
      >
      </v-toolbar-side-icon>

      <!-- BOTON DE ACORTADOR DE MENU -->
      <v-btn
        icon
        light
        @click.stop="showShortMenu = !showShortMenu"
        >
        <v-icon v-html="showShortMenu ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <!-- BOTON MENU CONFIGURACION -->
      <v-btn
        icon
        light
        @click="signOff()"
      >
        <v-icon light>power_settings_new</v-icon>
      </v-btn>

    </v-toolbar>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        showShortMenu: true,
        clipped: true,
        sideNavLeft: true,
        sideNavPending: false,
        sideNavConfig: false,
        title: 'Home',
      }
    },
    mounted(){

    },
    methods: {
      signOff(){
        this.$store.commit('globalMutation', { atribute: 'auth', value: false })
        // self.$store.commit('login', response.data.token)
        localStorage.removeItem('email');
        this.$router.push({ path: '/auth/' })
      }
    },
    computed: {
      auth(){
        return this.$store.state.auth
      },
      menuOptions(){
        return this.$store.state.menuStore
      }
    }
  }

</script>

<style lang="stylus" scoped>

</style>
