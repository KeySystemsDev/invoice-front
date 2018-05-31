<template lang="html">
  <div class="" style="background: #fdfdfd;">
    <v-container><!-- fluid grid-list-md -->
      <v-layout row wrap>
        <v-flex xs12 md4 md4 class="center prl15 pt10">
          <v-card class="p20">
            <img class="img_usuario" src="https://www.pharol.cl/images/logo-header.png">
            <br>
            <h1 class="title_profile_1">{{ firstName }}  {{ lastName }}</h1>
          </v-card>
        </v-flex>
        <v-flex xs12 md8 md8 class="prl15 pt10">
          <v-card class="p20">
            <v-btn class="btn-edit" @click.stop="dialog = true">
              <i class="material-icons" title="Editar">create</i> Editar
            </v-btn>
            <h1 class="title_profile_1">Datos</h1>
            <hr class="hr_profile">
            <h1 class="title_profile_2">Nombre: {{ firstName }}</h1>
            <br>
            <h1 class="title_profile_2">Apellido: {{ lastName }}</h1>
            <br>
            <h1 class="title_profile_2">Email: {{ email }}</h1>
            <br>
            <h1 class="title_profile_2">Télefono: {{ phone }}</h1>
            <br>
            <h1 class="title_profile_2">RUT: {{ rut }}</h1>
            <br>
            <h1 class="title_profile_2">Sexo: {{ sex }}</h1>
          </v-card>
          <br>
          <v-card class="p20">
            <v-btn class="btn-edit" @click.stop="dialog2 = true">
              <i class="material-icons">add</i> Agregar
            </v-btn>
            <h1 class="title_profile_1">Direcciones</h1>
            <hr class="hr_profile">
            <v-card class="p20 box_direc" v-for="(item, index) in itemAddress" :key="index">
              <h1 class="title_profile_2">Comuna: {{ item.commune }}</h1>
              <br>
              <h1 class="title_profile_2">Calle: {{ item.street }}</h1>
              <br>
              <h1 class="title_profile_2">N° Calle {{ item.street_number }}</h1>
              <br>
              <h1 class="title_profile_2">N° Casa/Depto: {{ item.number_dpto_house }}</h1>
              <v-btn flat @click="deleteAddress(index)" class="btn_delete" title="Borrar">
                <i class="material-icons">delete</i>
              </v-btn>
            </v-card>
          </v-card>

        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-layout row wrap>
                  <v-flex xs12 sm5 md5>
                    <v-text-field
                      label="Nombre (*)"
                      v-model="firstName"
                      :rules="[
                        (v) => !!v || v.length <= 3 || 'El usuario debe contener al menos 3 caracteres'
                      ]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                    <v-text-field
                      label="Apellido (*)"
                      v-model="lastName"
                      :rules="[
                      (v) => !!v || v.length <= 3 || 'El usuario debe contener al menos 3 caracteres'
                      ]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm5 md5>
                    <v-text-field
                      label="Coreo electrónico (*)"
                      v-model="email"
                      disabled
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                    <v-text-field
                      label="Teléfono"
                      type="number"
                      v-model="phone"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm5 md5>
                    <v-select
                      :items="itemsSex"
                      v-model="sex"
                      label="Sexo (*)"
                      :rules="[
                      (v) => !!v || 'Este campo es obligatorio'
                      ]"

                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                    <v-text-field
                      label="RUT"
                      type="text"
                      v-model="rut"
                      mask="##.###.###-N"

                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1 btn-modal-2" @click.native="dialog = false">Cerrar</v-btn>
            <v-btn color="naranja btn-modal-2" @click="setProfile()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Dirección</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-select
                    label="Comuna"
                    :items="comunas"
                    v-model="comuna"
                    item-text="name"
                    item-value="name"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                  <v-text-field
                    label="Calle"
                    v-model="street"
                    :rules="[
                      (v) => !!v || 'Campo obligatorio',
                    ]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-text-field
                    label="N° de calle"
                    v-model="numStreet"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                  <v-text-field
                    label="N° casa/ depto"
                    v-model="dpto"
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1 btn-modal-2" @click.native="dialog2 = false">Cerrar</v-btn>
            <v-btn color="naranja btn-modal-2" @click="setAdress()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  asyncData (context) {
    return {
      apiUser: context.env.apiUser,
      apiTag: context.env.apiTag,
    }
  },
  mounted(){
    this.email = localStorage.getItem('email')
    this.getProfile()
    this.getComunas()
  },
  data(){
    return {
      dialog: false,
      dialog2: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      sex: '',
      rut: '',
      direction: '',
      itemsSex: [
        'Masculino',
        'Femenino'
      ],
      house: '',
      street: '',
      numStreet: '',
      dpto: '',
      comuna: '',
      comunas: [],
      itemSchedule: [],
      schedule: null,
      formItem: {},
      itemAddress: null,

    }
  },
  methods: {
    getProfile(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiUser}/auth/info`,
        headers: {
          email: this.email,
        }
      })
      .then(function(response) {
        if (response.data.info) {
          self.firstName = response.data.info.first_name
          self.lastName = response.data.info.last_name
          self.sex = response.data.info.sex
          self.phone = response.data.info.phone
          self.rut = response.data.info.rut
          self.itemAddress = response.data.address
          console.log(self.itemAddress);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getComunas(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiTag}/commune`,
      })
      .then(function(response) {
        self.comunas = response.data;

      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setProfile(){
      this.dialog = false;
      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiUser}/auth/infoProfile`,
        data: {
          email: this.email,
          info: {
            first_name: this.firstName,
            last_name: this.lastName,
            phone: this.phone,
            sex: this.sex,
            rut: this.rut
          }
        }
      })
      .then(function(response) {
        self.$notify({
          title: 'Actualizado',
          message: 'Su perfil ha sido actualizado exitosamente',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setAdress(){
      this.dialog2 = false;
      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiUser}/auth/addAddressUser`,
        data: {
          email: this.email,
          address: {
            commune: this.comuna,
            street: this.street,
            street_number: this.numStreet,
            number_dpto_house: this.dpto,
          }
        }
      })
      .then(function(response) {
        self.$notify({
          title: 'Actualizado',
          message: 'Su su dirección ha sido agregada exitosamente',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })

        self.getProfile()
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteAddress(index){
      this.itemAddress.splice(index, 1)

      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiUser}/auth/updateAddressUser`,
        data: {
          email: this.email,
          address: this.itemAddress
        }
      })
      .then(function(response) {
        console.log(response);
        self.$notify({
          title: 'Actualizado',
          message: 'Su su dirección ha sido eliminada exitosamente',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })

        self.getProfile()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },

}
</script>

<style lang="css">
.img_usuario{
  max-width: 100%;
  width: 100%,
}
.prl15{
  padding-left: 15px;
  padding-right: 15px;
}
.p20{
  padding: 20px;
}
.pt10{
  padding-top: 10px;
}
.hr_profile{
  border: 1px solid #ddd;
  width: 100px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.title_profile_1{
  font-size: 20px;
  font-weight: 500;
}
.title_profile_2{
  font-size: 15px;
  font-weight: 400;
}
.btn-edit{
  position: absolute;
  right: 0;
  width: 0px;
  margin-top: -10px;
  text-transform: none;
  margin-right: 12px;
}
.btn-edit i{
  color: #4c4c4c;
  font-size: 16px;
  padding-right: 5px;
}
.btn-modal-2{
  color: #fff!important;
  text-transform: none;
}
.box_direc{
  box-shadow: 0px 1px 1px -1px rgba(0, 0, 0, .01), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .1);
}
.btn_delete{
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
