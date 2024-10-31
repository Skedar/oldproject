<template>
  <div>
    <v-app>
      <v-content>

        <toolbar title="3DMetri"></toolbar>
        <!-- my toolbar component -->


        <section>
          <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="400">
            <v-layout column align-center justify-center>
              <div class="display-2 font-weight-black">{{ $t('frontPage.head1') }}</div>
              <div class="display-1 mt-2">{{ $t('frontPage.head2') }}</div>
              <input type="file" id="fileinput" multiple="multiple" hidden @input="onInputChange" accept=".stl" />
            
              <pulse-loader :loading="!this.PRINTERS.length" :color="spinnerColor"></pulse-loader> 
              
  <v-btn :ripple="false"  large color="#3bc7b8" class="white--text font-weight-bold" fab @click="chooseFiles()"> 
 
           <!--  <v-btn :ripple="false" v-if="valid && this.PRINTERS.length" large color="#3bc7b8" class="white--text font-weight-bold" fab @click="chooseFiles()">  -->

             
                <v-icon>add</v-icon>
              </v-btn>
              <!-- <div v-if="!valid" class="black--text headline font-weight-bold">
                Invalid Usage! or Insufficient Credit
              </div> -->
            </v-layout>
          </v-parallax>
        </section>


        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm12 md8>
              <ItemsComponent2  :initialPrinters="PRINTERS" />
            </v-flex>
            <v-flex xs12 sm12 md4>
              <ShoppingCart  /> </v-flex>
          </v-layout>
        </v-container>

        <myfooter></myfooter>
        <!-- my footer component -->
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import toolbar from "../components/toolbar";
import myfooter from "../components/myfooter";

import ItemsComponent2 from "../components/ItemsComponent2";
import ShoppingCart from "../components/ShoppingCart";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import i18n from '@/plugins/i18n';


//import mydata from '../../public/mydata.json'



export default {
  name: "Fiyat3D",
  components: {
    toolbar,
    myfooter,
    ItemsComponent2,
    ShoppingCart,
    PulseLoader
  },
  
  data() {
    return {
      config: window.config, // global vars
      drawer: null,
      langs: [
        { flag: 'us', language: 'en', title: '-English(USA)', currency: 'USD', NumberFormat: 'en-EN' },
        { flag: 'tr', language: 'tr', title: '-Turkish', currency: 'TRY', NumberFormat: 'tr-TR' }
      ],
      spinnerColor: 'red',
      IS_VALID: {},
      PRINTERS:[],
  
     
      Loading: true,
    //  items: [],
      currentId: 0,
    }
  },
  beforeMount() {
    var base_url = window.location.origin;
    fetch('mydata.json')
    .then((response) => response.json())
    .then((data) => (this.PRINTERS =data));

    //this.PRINTERS = mydata;
    //Make an ajax request to our server for /technology via technology 
  //  axios.get(process.env.VUE_APP_BASE_API_URL + '/all?api_token=' + window.Metri_Config.API_TOKEN)
  //    .then(response => this.PRINTERS = (response.data)).catch(function(error) { console.log(error) });
  //  axios.get(process.env.VUE_APP_BASE_API_URL + '/valid?u=' + base_url + '&api_token=' + window.Metri_Config.API_TOKEN)
  //    .then(response => this.IS_VALID = (response.data)).catch(function(error) { console.log(error) });
  },
  computed: {
    ...mapState([
      'items'
    ]),

    valid() {
      if (this.IS_VALID.validation == 'false') {
        return false;
      } else {
        return true;
      }
    },
    // API_TOKEN() {
    //   return window.Metri_Config.API_TOKEN;
    // }



  }, //computed


  methods: {

    ...mapMutations([
      'ADD_TO_ITEMS'
    ]),

   


    chooseFiles: function() {
      document.getElementById("fileinput").click()
    },

    onInputChange(event) {

      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        //            console.log(event.target.files[i].name);
        var empytItem = new Object();
        empytItem.orderId = "";
        empytItem.name = files[i].name;
        empytItem.price = 0;
        empytItem.X = "";
        empytItem.Y = "";
        empytItem.Z = "";
        empytItem.Z = "";
        empytItem.unitFactor = 1;
        empytItem.unit = "mm";
        empytItem.volume = 0;
        empytItem.src = URL.createObjectURL(event.target.files[i]);
        empytItem.file = event.target.files[i];
        empytItem.quantity = 1;  

        empytItem.selectedPrinter={}; //secilen printer obje

        empytItem.printerMaterials=[]; //printerin materiallari obje
        empytItem.selectedMaterial={}; //secilen materiallari obje
       
        empytItem.materialColors=[];// malzemenin renkleri obje 
        empytItem.selectedColor={};// secilen renk obje 
       
        empytItem.materialInfills=[];// malzemenin infilleri obje 
        empytItem.selectedInfill={};// secilen infilleri obje 
        
        empytItem.materialLayerHeights=[];// malzemenin LayerHeight lari obje 
        empytItem.selectedLayerHeight={};// secilen LayerHeight  obje 
       
        empytItem.materialFinishings=[];// malzemenin Finishings lari obje 
        empytItem.selectedFinishing={};

        empytItem.id = this.currentId;
        empytItem.detailSeen = false;
        this.currentId++;

        //this.items.push(empytItem);
        this.ADD_TO_ITEMS(empytItem); // add to vuex items

      } //for
      document.getElementById("fileinput").value = "";


    },
  } //methods
} //export default
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
}
</style>