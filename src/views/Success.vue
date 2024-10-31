<template>
    <div>
      <v-app>
        <v-content>

            <toolbar title="3DMetri"></toolbar>
            <!-- my toolbar component -->

              <v-layout row mt-5 mb-5>
                <v-container>
                  <v-flex xs12 sm12 >
                          <v-alert
                      :value="true"
                      type="success"
                    >
                      
                      <div class="icon-box">
                              <i class="material-icons"></i>
                      </div>

                      <h1>Thank You!</h1>
                      <p>We have recived your payment</p>


                      <router-link to="/" exact>
                          <v-btn outline color="white">Go to home page</v-btn>
                          
                      </router-link>
                  </v-alert>
              </v-flex>
            </v-container>
          </v-layout>         

            <myfooter></myfooter>
            <!-- my footer component -->
          </v-content>
      </v-app>
    </div>
</template>





<script>

import toolbar from "../components/toolbar";
import myfooter from "../components/myfooter";

export default {
  name: 'Success',
  components: {
    toolbar,
    myfooter,
  },
  data () {
    return {
    }
  },
  mounted(){
    //  console.log(apiURL)
  }
}
</script>

<style lang="scss" scoped>
    /* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/materialicons/v43/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2') format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 64px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.icon-box {
    color: #fff;
   
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 5px;
    width: 95px;
    height: 95px;
    border-radius: 50%;
    z-index: 9;
    background: #82ce34;
    padding: 15px;
    text-align: center;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}
</style>
