<template>
  <div itemprop="itemListElement" itemscope itemtype="http://schema.org/Product">
   <v-card class="proucts_general">
     <a :href="`/products/${stringToSlug(item.name)}`">
       <div class="product-image-wrapper">
         <div class="single-products">
           <div class="box_triangulo" v-if="item.offer >= 1" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
             <div class="triangulo_equilatero"><p>{{ item.offer }}</p></div>
           </div>
           <img itemprop="image" class="resposive_img" :src="`https://pharol.s3.amazonaws.com/media/${item.image}`" width="100%" height="150">
           <div class="product-overlay" v-if="item.prescription_type == 'WP'">
             <div class="overlay-content">
               <div class="product_box_hover">
                 <img class="resposive_img" src="~/assets/images/RX/ic-Rr.png">
                 <h2>Presentación de receta</h2>
               </div>
             </div>
           </div>
           <div class="product-overlay" v-if="item.prescription_type == 'RP'">
             <div class="overlay-content">
               <div class="product_box_hover">
                 <img class="resposive_img" src="~/assets/images/RX/ic-Rr-2.png">
                 <h2>Receta retenida</h2>
               </div>
             </div>
           </div>
           <div class="product-overlay" v-if="item.prescription_type == 'RCH'">
             <div class="overlay-content">
               <div class="product_box_hover">
                 <img class="resposive_img" src="~/assets/images/RX/ic-Rch.png">
                 <h2>Receta Cheque</h2>
               </div>
             </div>
           </div>
           <div class="product-overlay" v-if="item.prescription_type == 'RRCS'">
             <div class="overlay-content">
               <div class="product_box_hover">
                 <img class="resposive_img" src="~/assets/images/RX/RX.png">
                 <h2>Receta retenida con control de stock</h2>
               </div>
             </div>
           </div>
           <div class="product-overlay" v-if="item.prescription_type == 'VDPR'">
             <div class="overlay-content">
               <div class="product_box_hover">
                 <img class="resposive_img" src="~/assets/images/RX/RX.png">
                 <h2>Venta directa presentación de Receta</h2>
               </div>
             </div>
           </div>
           <div class="product-overlay" v-if="item.prescription_type == 'APR'">
             <div class="overlay-content">
               <div class="product_box_hover">
                 <img class="resposive_img" src="~/assets/images/RX/ic-Rr.png">
                 <h2>Antibiotico con presentación de receta</h2>
               </div>
             </div>
           </div>
         </div>
       </div>
     </a>

       <v-card-title primary-title>
         <div>
           <a :href="`/products/${stringToSlug(item.name)}`">
             <h4 class="carru_title_1" itemprop="name">
               {{ MaysPrimera(item.name.toLowerCase()) }}
              </h4>
           </a>
           <p class="carru_title_2">
            {{ MaysPrimera(item.principe_active.slice(0,25).toLowerCase())}}
            <span v-show="item.principe_active.length>= 26">...</span>

          </p>
           <p class="carru_title_2"> {{ MaysPrimera(item.laboratory.toLowerCase()) }} </p>
           <h4 class="carru_title_3" v-if="item.offer >= 1" itemprop="price">
             {{ formatNumber(item.offer_price) }}
             <span class="carru_title_4" itemprop="price">
               {{ formatNumber(item.price) }}
             </span>
           </h4>
           <h4 class="carru_title_3" v-else itemprop="price">
             {{ formatNumber(item.price) }}
           </h4>
         </div>
         </v-card-title>
       </v-card>

 </div>
</template>

<script>
import format from 'format-number'
import axios from 'axios';

export default {
  props:['item'],
  components: {

  },
  data: function () {
    return {

    }
  },
  mounted(){
    // console.log(this.item);
  },
  methods: {
    stringToSlug(item){
      return item.toString().toLowerCase().replace(/ /g, '-')
    },

    formatNumber(item){
      return format({prefix: '$', integerSeparator: '.'})(item);
    },
    MaysPrimera(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

}
</script>

<style lang="stylus" scoped>/* */
  .card {
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);
  }
  .proucts_general {
    margin: 10px;
    color: #fff;
  }
  .proucts_general .btn__content {
    color: #fff;
    text-transform: capitalize;
  }
  .triangulo_equilatero {
     width: 0;
     height: 0;
     border-right: 40px solid transparent;
     border-top: 40px solid #f8002d;
     border-left: 40px solid #f8002d;
     border-bottom: 40px solid transparent;
     border-top-left-radius: 7px;
  }
  .box_triangulo{
    position: absolute;
    top:0;
    left: 0px;
  }
  .triangulo_equilatero p{
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
    color: #fff;
    font-weight: 900;
  }
  .carru_add_cart_btn{
    text-align: center;
    padding-bottom: 12px;
    margin-left: -3px;
  }
  .carru_title_1{
    color: #3f51b5;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .carru_title_2{
    color: #9a9a9a;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .carru_title_3 {
    color: #f44336;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .carru_title_4 {
    color: #9a9a9a;
    font-size: 12px;
  }
  .product-overlay {
    background: #ffffff80;
    top: 0;
    display: none;
    height: 0;
    position: absolute;
    -webkit-transition: height 500ms ease 0s;
    transition: height 500ms ease 0s;
    width: 100%;
    display: block;
  }
  .product-overlay .overlay-content {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
  .product-overlay h2 {
    color: #212121;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 700;
  }
  .product-overlay p {
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
    font-weight: 400;
    color: #212121;
  }
  .product-overlay .add-to-cart {
    background: #fff;
    border: 0 none;
    border-radius: 0;
    color: #FE980F;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    margin-bottom: 25px;
  }
  .add-to-cart i {
    margin-right: 5px;
  }

  .single-products:hover .product-overlay {
    display: block;
    height: 100%;
  }
  .single-products {
    position: relative;
  }

  .product-image-wrapper {
    overflow: hidden;
  }
  .product_box_hover{
    padding: 10px;
  }
  .detail_btn_add i{
    font-size: 16px;
    margin-left: 6px;
    margin-right: -10px;
  }
  .detail_btn_add {
    color: #fff!important;
    text-transform: none;
    margin-top: 15px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .line_add_cart{
    color: #d6491c;
    padding-left: 10px;
    padding-right: 5px;
  }

  .resposive_img {
    max-width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
  .btn-product-ss{
    text-transform: none;
    color: #fff !important;
    text-transform: none;
    margin-top: 15px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn-product-ss i{
    font-size: 16px;
    margin-left: 6px;
    margin-right: -10px;
  }
  /*responsive 550*/
  @media (max-width: 550px){
    .row_resposive{
      text-align: center;
    }
  }

</style>
