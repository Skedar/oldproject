<template>
  <div v-if="items.length" class="blue-grey darken-3">
   
    <v-layout row>
      <v-flex xs12 md12>
        <div class="white--text headline font-weight-bold">{{ $t('shoppingCart.shoppingCart') }}</div>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout row px-2>
      <v-flex xs5 md5>
        <div class="white--text title font-weight-black text-xs-left">{{ $t('shoppingCart.file') }}</div>
      </v-flex>
      <v-flex xs2 md2>
        <div class="white--text title font-weight-black">{{ $t('shoppingCart.qty') }}</div>
      </v-flex>
      <v-flex xs5 md5>
        <div class="white--text title font-weight-black text-xs-right">{{ $t('shoppingCart.total') }}</div>
      </v-flex>
    </v-layout>
    <hr>
    <div v-for="(item,index) in items" :key="item.id">
      <v-layout row px-2>
        <v-flex xs5 md5>
          <div class="white--text subheading text-xs-left">{{item.name}}</div>
        </v-flex>
        <v-flex xs2 md2>
          <div>       <!-- <div class="white--text subheading">{{item.quantity}}</div> -->
            <input type="number"  v-model="item.quantity" name="quantity" :min="minQty" :max="maxQty" onkeydown="return false" style="background-color:#37474f; height: 20px; border: solid 1px #bbc0c3; font-size:16px; color:white; ">
          </div>

        </v-flex>
        <v-flex xs5 md5>
          <div class="white--text subheading text-xs-right">{{formatMyMoney(item.price)}}</div>
        </v-flex>
      </v-layout>
    </div>
    <!-- end v-for -->
    <hr>
    <v-layout row justify-end px-2>
      <v-flex xs6 md6>
        <div class="white--text title font-weight-black  text-xs-right">{{formatMyMoney(cartTotal)}}</div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 md12>
       <!--  <v-btn  v-if="cartTotal>0" color="#3bc7b8" class="white--text font-weight-bold" data-toggle="modal" data-target="#myModalCenter">
          Checkout
          <v-icon right>shopping_cart</v-icon>
        </v-btn> -->
        <v-btn  v-if="!anyZeroItemPrice" color="#3bc7b8" class="white--text font-weight-bold" @click="checkoutView">
          {{ $t('shoppingCart.checkout') }}
          <v-icon right>shopping_cart</v-icon>
        </v-btn>
       



      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';


import i18n from '@/plugins/i18n';

export default {
  //props: ['initialItems'],
  name: "ShoppingCart",
  

  data: function() {
    return {
    //  items: this.initialItems,\
    maxQty: 10,
    minQty: 1
      

    };
  },
  methods: {

    checkoutView(){
    this.$router.push({ path: 'checkout'});
    },


    formatMyMoney(price) {

      if (i18n.locale == "tr") {
         var currency_symbol = "₺" //bunu koymassan basinda bu cikiyo

         var formattedOutput = new Intl.NumberFormat('tr-TR', {
             style: 'currency',
             currency: 'TRY',
             minimumFractionDigits: 2,
           });
          return formattedOutput.format(price).replace(currency_symbol, '')+" TL";
      } else {

      

      // return formattedOutput.format(price).replace(currency_symbol, '');
      var formattedOutput = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
        return formattedOutput.format(price);
    }

      
    },



  },
  computed: {
    ...mapState([
      'items'
    ]),
    ...mapGetters([
      'cartTotal','anyZeroItemPrice'
    ]),

    // cartTotal() {
    //   let total = 0;
    //   this.items.forEach((item) => {
    //     total += parseFloat(item.price, 10);
    //   });
    //   return total;
    // },

  }, //computed
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
</style>