<template>
  <div>

    <v-container>

     <toolbar title="3DMetri"></toolbar>
        <!-- my toolbar component -->

      <v-layout row>

        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar color="#fd6c6e" dark class="mt-5">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title>Payment Form</v-toolbar-title>
              <v-spacer></v-spacer>
 <img src="powered_by_stripe.png" alt="powered_by_stripe.png" >
            </v-toolbar>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0"> <b><label for="Name">{{ $t('form.cartTotal') }} :</label>
                  <label for="Name">${{ customer.cartTotal }} </label></b>
                </h3>
              </div>
            </v-card-title>    

            <v-list
              subheader
              three-line
            >
              <v-subheader>{{ $t('form.Order_id') }} : {{ customer.order_id }}</v-subheader>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Name</v-list-tile-title>
                  <v-list-tile-sub-title>{{ customer.customerName }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Email</v-list-tile-title>
                  <v-list-tile-sub-title>{{ customer.customerEmail }} </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="#3AC7B7" @click="checkout">Pay Now</v-btn>

            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>


    </v-container>
        <myfooter></myfooter>
        <!-- my footer component -->

    <vue-stripe-checkout
      ref="checkoutRef"
      :image="image"
      :name="name"
      :description="description"
      :currency="currency"
      :billing-address = "true"
      :amount="amount"
      :allow-remember-me="false"
      @done="done"
      @opened="opened"
      @closed="closed"
      @canceled="canceled"
    ></vue-stripe-checkout>
  </div>
</template>
 
<script>
import toolbar from "../components/toolbar";
import myfooter from "../components/myfooter";
import axios from 'axios';

export default {
  name: "stripeForm",
  components: {
    toolbar,
    myfooter,
  },  
  data() {
    return {
      customer : {},
      image: window.Metri_Config.PAYMENT_LOGO,
      name: window.Metri_Config.PAYMENT_COMPANY_NAME,
      description: window.Metri_Config.PAYMENT_DESCRIPTION,
      currency: 'US',
      api_token:'',
      order_id:''

    }

  },
  computed: {
    // a computed getter
    amount: function () {
      var self = this;
      return parseFloat(self.customer.cartTotal)*100;
    }
  },
  created() {
    var self = this;
   // debugger;
    //get url params
    //const urlParams = new URLSearchParams(window.location.search);
    self.api_token = self.$route.query['api_token'];
    self.order_id = self.$route.query['order_id'];
    
    //console.log(process.env.VUE_APP_FORM_API_URL);

    // request customer data from server 
    axios.get(process.env.VUE_APP_BASE_API_URL +'/getCustomer?api_token='+self.api_token+'&order_id='+self.order_id)
    .then(function (response) {
      // handle success
      self.customer = response.data;
      self.customer.order_id = self.order_id;
     // console.log(response.data);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  },
  methods: {
    async checkout () {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      const { token, args } = await this.$refs.checkoutRef.open();
    },
    done ({token, args}) {
      var self = this;
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      axios.post(process.env.VUE_APP_BASE_API_URL +'/stripeForm?api_token='+self.api_token+'&order_id='+self.order_id,token)
      .then(response => {
        console.log(response.data);
        if (response.data.includes('success')) // laravelden success geliyor basarili ise
        {  
          console.log('geldi');
          self.$router.push({ path: '/success' });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    opened () {
      // do stuff 
    },
    closed () {
      // do stuff 
    },
    canceled () {
      // do stuff 
    }
  }
}
</script>