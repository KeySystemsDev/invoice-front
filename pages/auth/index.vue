<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 md6 class="mx-auto">
        <h1 class="auth_title">Iniciar sesión</h1>
        <v-card class="p30">

            <br><br>
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccessFacebok"
              @error="onSignInErrorFacebook">
              Sign in with Facebook
            </fb-signin-button>


            <br><br>
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccessGoogle"
              @error="onSignInErrorGoogle">
              Sign in with Google
            </g-signin-button>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return {

        fbSignInParams: {
          scope: 'email, user_likes, public_profile',
          return_scopes: true
        },

        googleSignInParams: {
          client_id: '559025716898-a340hi2p8t3rpvp9cjducp8f311c1ild.apps.googleusercontent.com'
        }
      }
    },
    mounted(){
      window.fbAsyncInit = function() {
       FB.init({
         appId      : '1960641290915466',
         cookie     : true,  // enable cookies to allow the server to access the session
         xfbml      : true,  // parse social plugins on this page
         version    : 'v3.0' // use graph api version 2.8
       });
     };
     (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
    },
    methods: {
      onSignInSuccessGoogle (googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users
        // console.log(googleUser);
        const profile = googleUser.getBasicProfile() // etc etc
        console.log(profile);
        // this.$notify({
        //   title: `Bienvenido ${this.email}`,
        //   message: 'Ha iniciado sesión correctamente.',
        //   type: 'info',
        //   horizontalAlign: 'right',
        //   showClose: false
        // })
      },
      onSignInErrorGoogle (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      },

      onSignInSuccessFacebok (response) {
        FB.api('/me?fields=email,name,address', done => {
          console.log(done);
          // this.$notify({
          //   title: `Bienvenido ${this.email}`,
          //   message: 'Ha iniciado sesión correctamente.',
          //   type: 'info',
          //   horizontalAlign: 'right',
          //   showClose: false
          // })

        })
      },
      onSignInErrorFacebook (error) {
        console.log('OH NOES', error)
      },
    }
  }
</script>

<style>
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }


  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }

</style>
