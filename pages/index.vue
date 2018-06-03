<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="De"
            v-model="email_from"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Para"
            v-model="email_to"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Fecha"
            v-model="date"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Numero"
            v-model="number_invoice"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-select
            :items="itemsPayment"
            v-model="payment"
            label="Tipo de Pago"
          ></v-select>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Expira"
            v-model="expiration"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Sub Total"
            v-model="sub_total"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Descuento"
            v-model="discount"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Envío"
            v-model="shipping"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Impuesto"
            v-model="tax"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Total"
            v-model="total"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Impuesto"
            v-model="tax"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <hr>
      <v-layout row wrap  v-for="(input, index) in inputs" :key="index">
        <v-flex xs12 md6 sm6>
          <v-text-field
            label="Descripción"
            v-model="input.description"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md2 sm2>
          <v-text-field
            label="Precio"
            v-model="input.price"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md1 sm1>
          <v-text-field
            label="Cantidad"
            v-model="input.quantity"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md2 sm2>
          <v-text-field
            label="Amount"
            v-model="input.amount"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md1 sm1>
          <v-btn color="success" @click="deleteRow(index)">x</v-btn>
        </v-flex>
      </v-layout>

      <v-flex xs12 md1 sm1>
        <v-btn color="success" @click="addRow()">Agregar</v-btn>
      </v-flex>

    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return {
        inputs: [
          {
            description: '',
            price: 0,
            quantity: 0,
            amount: 0
          }
        ],
        email_from: 'diego.carciente@gmail.com',
        email_to: 'diego.carciente@gmail.com',
        date: '99/99/9999',
        number_invoice: 99,
        payment: 'contado',
        itemsPayment: [
          'contado', 'transferencia'
        ],
        expiration: '99/99/9999',
        sub_total: 999,
        discount: 9,
        shipping: 99,
        tax: 9,
        total: 999,
        note: 'Notas',
        terms: 'Terminos y condiciones',
        category: null,
        itemsCategory: [
          'Informática, Abogados, Consultoria, Tienda'
        ],
      }
    },
    methods: {
      addRow() {
        this.inputs.push({
          description: '',
          price: 0,
          quantity: 0,
          amount: 0
        })
        console.log(this.inputs);
      },
      deleteRow(index) {
        console.log(index);
        this.inputs.splice(index,1)
      }
    }
  }
</script>

<style>


</style>
