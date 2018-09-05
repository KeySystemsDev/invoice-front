<template>
  <div>
    <v-toolbar dark fixed color="primary">
      <v-toolbar-title class="white--text">Factura en línea</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.native="sheet = true">
        <v-icon>help_outline</v-icon>
      </v-btn>
      <v-btn icon @click="sendInvoice()">
        <v-icon>send</v-icon>
      </v-btn>

      <v-tabs
        slot="extension"
        v-model="model"
        centered
        color="primary"
        dark
        slider-color="white"
      >
        <v-tab
          href="#tab-1">
          Info
        </v-tab>

        <v-tab
          href="#tab-2">
          Factura
        </v-tab>

        <v-tab
          href="#tab-3">
          Detalle
        </v-tab>

        <v-tab
          href="#tab-4">
          Totales
        </v-tab>

        <v-tab
          href="#tab-5">
          Notas
        </v-tab>

      </v-tabs>
    </v-toolbar>


    <v-form ref="form" v-model="valid" lazy-validation>
      <v-tabs-items v-model="model">
        <v-tab-item
          id="tab-1">
          <v-container grid-list-lg>
            <v-card flat>
              <h1 class="title">1. Datos Basicos</h1>
              <v-layout row wrap>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="¿Quién envía?"
                    v-model="fromClient"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                    ]"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="¿Quién Recibe?"
                    v-model="toClient"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                    ]"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="De"
                    v-model="from"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido'
                    ]"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="Para"
                    v-model="to"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido'
                    ]"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="Asunto"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                    ]"
                    v-model="subject"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="Enviar copia a:"
                    v-model="cc"
                    hint="Agregue un email adicional."
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>

                <!-- <v-flex fluid xs12 md6 sm6>
                  <v-select
                    :items="itemsCategory"
                    v-model="category"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                    ]"
                    label="¿De que se trata su negocio?"
                    required
                  ></v-select>
                  <v-text-field
                    label="Copia Oculta a:"
                    v-model="bcc"
                  ></v-text-field>
                </v-flex> -->
              </v-layout>
            </v-card>
          </v-container>

        </v-tab-item>

        <v-tab-item
          id="tab-2">
          <v-container grid-list-lg>
            <v-card flat>
              <h1 class="title">2. Datos de la Factura</h1>
              <v-layout row wrap>
                <v-flex fluid xs12 md6 sm6>
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      :rules="[
                        (v) => !!v || 'Este campo es obligatorio',
                      ]"
                      label="Fecha de emisión"
                      prepend-icon="event"
                      readonly
                      required
                    ></v-text-field>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="Numero"
                    v-model="numberInvoice"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                    ]"
                    type="number"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex fluid xs12 md6 sm6>
                  <v-select
                    :items="itemsPayment"
                    v-model="payment"
                    :rules="[
                      (v) => !!v || 'Este campo es obligatorio',
                    ]"
                    required
                    label="Tipo de Pago"
                  ></v-select>
                </v-flex>
                <v-flex fluid xs12 md6 sm6>
                  <v-dialog
                    ref="dialog1"
                    v-model="modal1"
                    :return-value.sync="expiration"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="expiration"
                      :rules="[
                        (v) => !!v || 'Este campo es obligatorio',
                      ]"
                      label="Fecha de vencimiento"
                      prepend-icon="event"
                      readonly
                      required
                    ></v-text-field>
                    <v-date-picker v-model="expiration" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog1.save(expiration)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>
              <!-- <v-layout row wrap>
                <v-flex fluid xs12 md6 sm6>
                  <v-text-field
                    label="Hastag"
                    v-model="tag"
                  ></v-text-field>
                </v-flex>
              </v-layout> -->
            </v-card>
          </v-container>
        </v-tab-item>

        <v-tab-item
          id="tab-3">
          <v-container grid-list-lg>
            <v-card flat>
              <h1 class="title">3. Detalle de la Compra</h1>
                <v-layout row wrap v-for="(input, index) in inputs" :key="index">
                  <v-flex xs12 md4 sm4>
                    <v-text-field
                      label="Descripción"
                      v-model="input.item"
                      :rules="[
                        (v) => !!v || 'Este campo es obligatorio',
                      ]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4 md2 sm2>
                    <v-text-field
                      label="Precio"
                      type="number"
                      v-model="input.price"
                      :rules="[
                        (v) => !!v || 'Este campo es obligatorio',
                      ]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2 md2 sm2>
                    <v-text-field
                      label="Cantidad"
                      type="number"
                      v-model="input.quantity"
                      :change="calculateAmount(index, input.price, input.quantity)"
                      :rules="[
                        (v) => !!v || 'Este campo es obligatorio',
                      ]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4 md2 sm2>
                    <v-text-field
                      label="Total"
                      v-model="input.rate"
                      disabled
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2 md1 sm1>
                    <v-btn class="cerrar" fab dark small color="red" @click="deleteRow(index)">
                      <v-icon dark>close</v-icon>
                    </v-btn>
                  </v-flex>

                </v-layout>
            </v-card>
          </v-container>
        </v-tab-item>

        <v-tab-item
          id="tab-4">
          <v-container grid-list-lg>
            <v-card flat>
              <h1 class="title">4. Envio y Totales</h1>
              <v-layout row wrap>
                <v-flex fluid xs6 md6 sm6>
                  <v-text-field
                    label="Envío"
                    type="number"
                    v-model="shipping"
                  ></v-text-field>
                </v-flex>
                <v-flex fluid xs6 md6 sm6>
                  <v-text-field
                    label="Sub Total"
                    type="number"
                    v-model="subTotal"
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex fluid xs6 md6 sm6>
                  <v-text-field
                    label="Impuesto en %"
                    type="number"
                    v-model="tax"
                  ></v-text-field>
                </v-flex>
                <v-flex fluid xs6 md6 sm6>
                  <v-text-field
                    label="Sub Total + Impuesto"
                    v-model="subTotalTax"
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex fluid xs6 md6 sm6>
                  <v-text-field
                    label="Descuento en %"
                    type="number"
                    v-model="discount"
                  ></v-text-field>
                </v-flex>
                <v-flex fluid xs6 md6 sm6>
                  <v-text-field
                    label="Total - Descuento"
                    v-model="total"
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
        </v-tab-item>


        <v-tab-item
          id="tab-5">
          <v-container grid-list-lg>
            <v-card flat>
              <h1 class="title">5. Notas</h1>
              <v-layout row wrap>
                <v-flex fluid xs12 md12 sm12>
                  <v-text-field
                    label="Observaciones"
                    v-model="note"
                    multi-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex fluid xs12 md12 sm12>
                  <v-text-field
                    label="Términos y condiciones"
                    v-model="terms"
                    multi-line
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
        </v-tab-item>

      </v-tabs-items>
    </v-form>


    <v-btn
      fixed
      dark
      fab
      bottom
      right
      v-if="model == 'tab-3'"
      color="pink"
      @click="addRow()">
      <v-icon>add</v-icon>
    </v-btn>


    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>Opciones</v-subheader>
        <v-list-tile @click="sendInvoice()">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon>check</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>Enviar</v-list-tile-title>
        </v-list-tile>

        <v-list-tile href="https://api.whatsapp.com/send?phone=56982565380">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon>call</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>Contactar</v-list-tile-title>
        </v-list-tile>

        <!-- <v-list-tile @click="">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon>how_to_vote</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>Sugerencia</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon>share</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>Compartir</v-list-tile-title>
        </v-list-tile> -->

      </v-list>
    </v-bottom-sheet>


    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog = false"><v-icon>close</v-icon></v-btn>
        </v-card-actions>
        <v-card-text  align="center">
          <img src="~/assets/images/check.png" width="20%">
          <p>Mensaje enviado con éxito</p>
        </v-card-text>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return {
        valid: true,
        modal: false,
        modal1: false,
        sheet: false,
        chips: null,
        model: 'tab-1',
        dialog: false,
        inputs: [
          {
            item: '',
            price: '',
            quantity: 1,
            rate: ''
          }
        ],
        fromClient: '',
        toClient: '',
        from: '',
        to: '',
        subject: '',
        bcc: '',
        cc: '',
        date: '',
        expiration: '',
        numberInvoice: null,
        payment: 'Efectivo',
        itemsPayment: [
          'Efectivo', 'Transferencia', 'Cheque', 'Depósito', 'BitCoin', 'Otro'
        ],
        discount: '',
        shipping: '',
        tax: '',
        tag: '',
        note: '',
        terms: '',
        category: 'Informática',
        itemsCategory: [
          'Tecnología', 'Consultoria', 'Comercio', 'Tienda', 'Otro'
        ],
      }
    },
    methods: {
      sendInvoice(){
        if (this.$refs.form.validate()) {
          this.sheet = false;
          let self = this;
          axios({
            method:'POST',
            url:`https://proyectonodeinvoice-mxdacgppof.now.sh/api/invoiceEmail`,
            data: {
              from_client: this.fromClient,
              to_client: this.toClient,
              from: this.from,
              to: [ this.to, this.from ],
              cc: this.cc,
              bcc: this.bcc,
              subject: this.subject,
              date: this.date,
              number_invoice: this.numberInvoice,
              payment: this.payment,
              expiration: this.expiration,
              sub_total: this.subTotal,
              discount: (this.discount) ? this.discount : 0 ,
              shipping: (this.shipping) ? this.shipping : 0,
              tax: (this.tax) ? this.tax : 0,
              total: this.total,
              note: (this.note) ? this.note : 'Sin observaciones.',
              terms: (this.terms) ? this.terms : 'No se aplica en esta boleta.',
              category: this.category,
              items: this.inputs
            }
          })
          .then(function(response) {
            console.log(response);
            self.dialog = true;
          });
        } else {
          this.$notify({
            title: `Disculpe!`,
            message: 'Faltan campos por rellenar',
            type: 'danger',
            verticalAlign: 'bottom',
            showClose: false
          })
        }

      },
      addRow() {
        let i = this.inputs.length;
        this.inputs.push({
          item: null,
          price: 0,
          quantity: 1,
          rate: 0
        })
      },
      deleteRow(index) {
        this.inputs.splice(index,1)
      },
      remove (item) {
         this.chips.splice(this.chips.indexOf(item), 1)
         this.chips = [...this.chips]
       },
      calculateAmount(index, price, quantity){
        this.inputs[index].rate = price * quantity
      },
    },
    computed: {
      subTotal(){
        let suma = this.inputs.reduce((sum, item) => sum + item.rate, 0);

        if (this.shipping){
          return suma + parseInt(this.shipping);
        } else if (this.inputs[0].rate) {
          return suma
        } else {
          return null
        }
      },
      subTotalTax(){
        if (this.tax) {
          return parseFloat(this.subTotal) + (parseFloat(this.subTotal) * parseInt(this.tax) / 100);
        } else {
          return null
        }
      },
      total(){
        if (this.discount) {
          return parseFloat(this.subTotalTax) - (parseFloat(this.subTotalTax) * parseInt(this.discount) / 100);
        } else if (this.subTotal) {
          return parseFloat(this.subTotal);
        } else {
          return null
        }
      }

    }
  }
</script>

<style>

  /* DESKTOP */
  .tabs__content{
    background-color: #ffffff;
  }
  .container {
    margin-top: 150px;
    margin-bottom: 50px;
  }

  /* MOBILE */
  @media (max-width: 480px) {
    .container {
      margin-top: 130px;
      margin-bottom: 40px;
    }
  }
</style>
