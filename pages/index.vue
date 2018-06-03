<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="De"
            v-model="fromClient"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Para"
            v-model="toClient"
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
            v-model="numberInvoice"
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
            v-model="subTotal"
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
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-select
            :items="itemsCategory"
            v-model="category"
            label="Rubro"
          ></v-select>
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

      <v-flex xs12 md1 sm1>
        <v-btn color="success" @click="sendInvoice()">Enviar</v-btn>
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
            description: 'Descripción 0',
            price: 0,
            quantity: 0,
            amount: 0
          }
        ],
        fromClient: 'diego.carciente@gmail.com',
        toClient: 'diego.carciente@gmail.com',
        date: '99/99/9999',
        numberInvoice: 99,
        payment: 'contado',
        itemsPayment: [
          'contado', 'transferencia'
        ],
        expiration: '99/99/9999',
        subTotal: 999,
        discount: 9,
        shipping: 99,
        tax: 9,
        total: 999,
        note: 'Notas',
        terms: 'Terminos y condiciones',
        category: 'Informática',
        itemsCategory: [
          'Informática', 'Abogados', 'Consultoria', 'Tienda'
        ],
      }
    },
    methods: {
      sendInvoice(){
        axios({
          method:'POST',
          url:`http://localhost:3002/api/invoice`,
          data: {
            from_client: this.fromClient,
            to_client: this.toClient,
            date: this.date,
            number_invoice: this.numberInvoice,
            payment: this.payment,
            expiration: this.expiration,
            sub_total: this.subTotal,
            discount: this.discount,
            shipping: this.shipping,
            tax: this.tax,
            total: this.total,
            note: this.note,
            terms: this.terms,
            category: this.category,
            items: this.inputs
          }
        })
        .then(function(response) {
          console.log(response);
        });

      },
      addRow() {
        let i = this.inputs.length;
        this.inputs.push({
          description: ` Descripcion ${i}`,
          price: i,
          quantity: i,
          amount: i
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
