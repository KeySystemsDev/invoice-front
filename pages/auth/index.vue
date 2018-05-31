<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 md6 class="mx-auto">
        <h1 class="auth_title">Iniciar sesión</h1>
        <v-card class="p30">
          <!-- <div class="center pb30">
            <v-btn class="auth_btn_redes"><img src="~/assets/images/facebook.png" width="30px"> Iniciar con Facebook</v-btn>
            <v-btn class="auth_btn_redes"><img src="~/assets/images/google.png" width="30px"> Iniciar con Google+</v-btn>
          </div> -->
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="[
                (v) => !!v || 'E-mail es obligatorio',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
              ]"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
              :rules="[
                (v) => !!v || 'Password es obligatorio',
              ]"
              required
            ></v-text-field>
            <router-link
              to="/auth/recover"
            >
              ¿Olvido su contraseña?
            </router-link>
            <br><br>
            <div class="center">
              <v-btn class="auth_btn_is"
                @click="submit"
                :disabled="!valid"
              >
                Iniciar sesión
              </v-btn>
            </div>
            <div class="center auth_clickaqui">
              <br>
              ¿Aún no estas registrado?
              <router-link
                to="/auth/register"
              >
                Haz click aquí
              </router-link>
            </div>
          </v-form>
        </v-card>
        <p> {{ msg }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  asyncData (context) {
    return {
      apiUser: context.env.apiUser,
      apiPurchase: context.env.apiPurchase,
    }
  },
  data: () => ({
    valid: true,
    password: '',
    email: '',
    msg: null,
  }),
  methods: {
    submit () {
      var self = this;
      if (this.$refs.form.validate()) {
        axios({
          method:'post',
          url:`${this.apiUser}/auth/loginPanel`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(function(response) {
          if (response.data.token) {
            console.log("entro");
            self.$store.commit('globalMutation', { atribute: 'auth', value: response.data.token })
            self.$store.commit('setPermissions', response.data.permissions )
            // self.$store.commit('login', response.data.token)
            localStorage.setItem('email', self.email);

            self.$notify({
              title: `Bienvenido ${self.email}`,
              message: 'Ha iniciado sesión correctamente.',
              type: 'info',
              horizontalAlign: 'right',
              showClose: false
            })

            self.$router.push({ path: '/' })
          }

          if (!response.data.token) {
            self.$notify({
              title: 'Error',
              message: `Problemas al iniciar sesión: ${response.data.msg}`,
              type: 'danger',
              horizontalAlign: 'right',
              showClose: false
            })
          }
        });


      }
    },
    clear () {
      this.$refs.form.reset()
    },
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
  .p30{
    padding: 30px;
  }
  .pb30{
    padding-bottom: 30px;
  }
  .mx-auto{
    margin-left: auto!important;
    margin-right: auto!important;
  }
  .auth_title{
    font-size: 18px;
    font-weight: 500;
    color: #3949ab;
    margin-bottom: 20px;
  }
  .auth_btn_redes{
    text-transform: none;
    background-color: #fff!important;
  }
  .auth_btn_redes img{
    padding-right: 10px;
  }
  .auth_btn_is{
    background-color: #fd5621!important;
    text-transform: none;
    color: #fff!important;
  }
  .auth_clickaqui{
    font-size: 14px;
  }
</style>
