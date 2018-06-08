<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Su Nombre"
            v-model="fromClient"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Destinatario"
            v-model="toClient"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="De"
            v-model="from"
          ></v-text-field>
        </v-flex>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Para"
            v-model="to"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md12 sm12>
          <v-text-field
            label="Asunto"
            v-model="subject"
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
            type="number"
            v-model="input.price"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md1 sm1>
          <v-text-field
            label="Cantidad"
            type="number"
            v-model="input.quantity"
            :change="calculateAmount(index, input.price, input.quantity)"

          ></v-text-field>
        </v-flex>
        <v-flex xs12 md2 sm2>
          <v-text-field
            label="Amount"
            v-model="input.amount"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md1 sm1>
          <v-btn color="success" @click="deleteRow(index)">x</v-btn>
        </v-flex>
      </v-layout>


      <v-layout row wrap>
        <v-flex xs12 md1 sm1>
          <v-btn color="success" @click="addRow()">Agregar</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Envío"
            type="number"
            v-model="shipping"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Sub Total"
            type="number"
            v-model="subTotal"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Impuesto"
            type="number"
            v-model="tax"
          ></v-text-field>
        </v-flex>
        Sub total con impuesto: {{ subTotalTax }}
      </v-layout>
      <v-layout row wrap>
        <v-flex fluid xs12 md6 sm6>
          <v-text-field
            label="Descuento"
            type="number"
            v-model="discount"
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

        </v-flex>
      </v-layout>



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
            quantity: 1,
            amount: 0
          }
        ],
        fromClient: 'Diego Carciente',
        from: 'diego.carciente@gmail.com',
        toClient: 'Sol Coello',
        to: 'diego.carciente@gmail.com, solcarycoello@gmail.com',
        subject: 'Asunto',
        date: '99/99/9999',
        numberInvoice: 99,
        payment: 'contado',
        itemsPayment: [
          'contado', 'transferencia'
        ],
        expiration: '99/99/9999',
        discount: 0,
        shipping: 0,
        tax: 0,
        // subTotal: 999,
        // total: 0,
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
          url:`http://localhost:3002/api/invoiceEmail`,
          data: {
            from: this.from,
            to: this.to,
            cc: this.toClient,
            bcc: this.toClient,
            subject: this.subject,
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
      },
      deleteRow(index) {
        this.inputs.splice(index,1)
      },
      calculateAmount(index, price, quantity){
        this.inputs[index].amount = price * quantity
      }
    },
    computed: {
      subTotal(){
        let suma = this.inputs.reduce((sum, item) => sum + item.amount, 0);
        return suma + parseInt(this.shipping);
      },
      subTotalTax(){
        return parseFloat(this.subTotal) + (parseFloat(this.subTotal) * parseInt(this.tax) / 100);
      },
      total(){
        return parseFloat(this.subTotalTax) - (parseFloat(this.subTotalTax) * parseInt(this.discount) / 100);
      }

    }
  }
</script>

<style>


</style>
