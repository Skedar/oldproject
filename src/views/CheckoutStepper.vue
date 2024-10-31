<template>
 <div>
 <toolbar title="3DMetri"></toolbar>
        <!-- my toolbar component -->

  <v-stepper v-model="e1" class="mt-5 ">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">{{ $t("checkoutStepper.personalDetails") }}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">{{ $t("checkoutStepper.uploadFiles") }}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">{{ $t("checkoutStepper.lastStep") }}</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">


          <v-layout row>

        <v-flex xs12 sm6 offset-sm3>
          <v-card
           class="mb-5"

          height="280px"
          >
            <v-toolbar color="#fd6c6e" dark >
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title>{{ $t("checkoutStepper.personalDetails") }}</v-toolbar-title>

            </v-toolbar>




                                            <v-form
                                                ref="form"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <v-text-field
                                                v-model="customer.name"
                                                :rules="nameRules"
                                                :label="$t('checkoutStepper.name')"
                                                required
                                                ></v-text-field>

                                                <v-text-field
                                                v-model="customer.email"
                                                :rules="emailRules"
                                                :label="$t('checkoutStepper.email')"
                                                required
                                                ></v-text-field>
                                                <v-text-field
                                                v-model="customer.phone"
                                                :rules="phoneRules"
                                                :label="$t('checkoutStepper.phone')"
                                                required
                                                ></v-text-field>


                                            </v-form>


        </v-card>
        </v-flex>
      </v-layout>

        <v-btn 
          :disabled="!valid"
          color="primary"
          @click="e1 = 2"
        >
          {{ $t("checkoutStepper.next") }}>
        </v-btn>

       
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          height="280px"
        >


                                                  <div class="container-fluid">
                                                    <h4 ><p v-if="items.length > 1">{{ $t("checkoutStepper.uploadFilestoServer") }}</p>
                                                         <p v-else>{{ $t("checkoutStepper.uploadFiletoServer") }}</p></h4>

                                                    <div class="row">
                                                      
                                                 <!--      <div class="col-md-12">
                                                        <progress max="100" width="50" :value.prop="uploadPercentage"></progress>
                                                      </div> -->
                                                      <div class="col-md-12">
                                                        <v-progress-circular
                                                         
                                                          :rotate="360"
                                                          :size="100"
                                                          :width="15"
                                                          :value="uploadPercentage"
                                                          color="teal"
                                                        >
                                                          {{ uploadPercentage }}
                                                        </v-progress-circular>
                                                      </div>

                                                    </div>
                                                        <br>
                                                        <p v-if="items.length > 1">{{items.length}} {{ $t("checkoutStepper.files") }}</p>
                                                        <p v-else>{{items.length}} {{ $t("checkoutStepper.file") }}</p>
                                                          
                                                        <br>
                                                        <p> {{uploadStatus}}</p>

                                                        <p v-if="uploadDone" > {{ $t("checkoutStepper.filesUploadedSuccessfully") }}</p>
                                                  </div>


      </v-card>

        <v-btn
          color="primary"
          @click="submitFiles()"
        >
          {{ $t("checkoutStepper.uploadFiles") }}
        </v-btn>

       
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          height="280px"
        >
                                                  <p><h2>{{ $t("checkoutStepper.filesSended1") }}</h2></p>
                                                  <p><h4>{{ $t("checkoutStepper.filesSended2") }}</h4></p>
        </v-card>

        <v-btn
          color="primary"
          @click="Completed()"
        >
         {{ $t("checkoutStepper.finish") }} 
        </v-btn>

       
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
     <myfooter></myfooter>
        <!-- my footer component -->
</div>
</template>
<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';
    import toolbar from "../components/toolbar";
    import myfooter from "../components/myfooter";
    import axios from 'axios';
    import i18n from '@/plugins/i18n';
    

    export default {
        name: "checkoutStepper",
        components: {
            toolbar,
            myfooter,
        },
        data () {
        return {
            e1: 0,
            customer:{
                name:'',
                email:'',
                phone:''
            },
            valid: true,
            uploadPercentage: 0,
            uploadDone:false,
            uploadStatus:'',
 /*
            nameRules: [
                v => !!v || 'Name is required',
               // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],

           emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            phoneRules: [
                v => !!v || 'Phone is required',
                v => /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/.test(v) || 'Phone must be valid'
            ],*/
        }//return
        },//data
        computed: {
          ...mapState([
            'items'
          ]),
          ...mapGetters([
            'cartTotal'
          ]),

          nameRules() {
            if (i18n.locale == "tr") {
              return [
                v => !!v || 'İsim zorunlu alandır.',
                
              ]
            }else{
              return [
                v => !!v || 'Name is required',
                
              ]
            }
              
          },//name rules

          emailRules() {
            if (i18n.locale == "tr") {
              return [
                v => !!v || 'E-posta zorunlu alandır.',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Geçerli bir e-posta girin.'
              ]
            }else{
              return [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
              ]
            }
              
          },//email rules

          phoneRules() {
            if (i18n.locale == "tr") {
              return [
                v => !!v || 'Telefon zorunlu alandır.',
                v => !/[^+].[^0-9]/.test(v) || 'Geçerli bir telefon girin.'
              ]
            }else{
              return [
                v => !!v || 'Phone is required',
                v => /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/.test(v) || 'Phone must be valid'
              ]
            }
              
          },//phone rules

        }, //computed
        mounted(){
          var self = this; 
          self.validate();
        },

        methods: {

          Completed: function(){
             document.location.href="/";
          },

          

          async submitFiles(){
            // prepare metadta
            let orderItems=[];
            for( var i = 0; i < this.items.length; i++ ){
                let temp = {
                  "name":this.items[i].name,
                  "price":this.items[i].price.toFixed(2),
                  "quantity":this.items[i].quantity,
                  "printer":this.items[i].selectedPrinter.label,
                  "material":this.items[i].selectedMaterial.label,
                  "color":this.items[i].selectedColor.label,
                  "infill": this.items[i].selectedInfill.label,
                  "layerHeight": this.items[i].selectedLayerHeight.label,
                  "finishing":this.items[i].selectedFinishing.label,
                  "unit":this.items[i].unit
                }
                orderItems.push(temp);
            }

            // create stripe Payment Link
            this.uploadStatus = 'Creating Stripe Payment Link...';
            let paymentLinkURL = await this.createStripePaymentLink(this.customer.email,this.cartTotal.toFixed(2)*100);

            let metaData={
              "order": {
                "customerName": this.customer.name,
                "cusomerEmail": this.customer.email,
                "customerPhone":this.customer.phone,
                "cartTotal": this.cartTotal.toFixed(2),
                "orderItems": orderItems,
                "paymentLink":paymentLinkURL
              },
              
            }

            // email data
            this.uploadStatus = 'Recording Order Details...';
            this.sendEmail(metaData);
            // loop files
            for( var i = 0; i < this.items.length; i++ ){
              let file = this.items[i].file;
              let fileName = this.customer.name + '/' + this.items[i].name;
              // get signed url
              console.log('signed url requested');
              let URL = await this.getSignedURL(fileName);
              //console.log(URL);
              // upload file to signedurl
              this.uploadStatus = 'Uploading file: ' + (i+1);
              console.log('uploading file: ', i+1);
              let rerspose = await this.uploadSingleFile(URL,file);
            }//for
            
            // bitti
            this.uploadDone = true;
            this.e1 = 3;

            


            
            
          },  


          validate () {
                if (this.$refs.form.validate()) {
                this.snackbar = true
                }
          },
          reset () {
                this.$refs.form.reset()
          },
          resetValidation () {
                this.$refs.form.resetValidation()
          },

          async getSignedURL(fileName) {
            var self = this;
            try {
              let myBody = {"object_key": fileName}
              console.log(myBody);
              const response = await axios.post(
                //process.env.VUE_APP_BASE_GET_SIGNED_URL,
                window.Metri_Config.VUE_APP_BASE_GET_SIGNED_URL,
                myBody
              );
              console.log('get the signed url');
              return response.data.url;
            } catch (error) {
              console.log(error);
              self.$router.push({ path: 'upload_error'});
            }
          },

          async uploadSingleFile(URL,file) {
            var self = this; 
            self.uploadPercentage = 0;
            try {
              const response = await axios.put(
                URL,
                file,
                {
                  onUploadProgress: function( progressEvent ) {
                    self.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                  }.bind(self)
                }
              );
              console.log('File Uploaded with success');
              return;
            } catch (error) {
              console.log(error);
              self.$router.push({ path: 'upload_error'});
            }
          },


          sendEmail(metaData){
            console.log(metaData);
            let temp ='';
            let formData1='<html><html lang="en"><head><meta charset="utf-8"><title>New Order</title> <meta name="viewport" content="width=device-width, initial-scale=1"></head>'+
            '<body><div class="container">'+
            '<b>customerName: </b>'+metaData.order.customerName+'<br>'+
            '<b>customerEmail: </b>'+metaData.order.cusomerEmail+'<br>'+
            '<b>customerPhone: </b>'+metaData.order.customerPhone+'<br>'+
            '<b>cartTotal: </b><b>'+metaData.order.cartTotal+'</b><br>'+
            '<b>paymentLink: </b><b>'+metaData.order.paymentLink+'</b><br>'+
            '<b>After reviewing the submitted files, you can request payment by sending the payment link above to your customer.</b><br>'+
            '<table><tbody>';
              //temp = `<tr><td>File Name</td><td>${metaData.name[0]}</td></tr>`;
            for( var i = 0; i < metaData.order.orderItems.length; i++ ){

               temp = temp + `<br><tr><td><b>File Name</b></td><td>${metaData.order.orderItems[i].name}</td></tr><tr><td><b>Price</b></td><td>${metaData.order.orderItems[i].price}</td></tr><tr><td><b>Quantity</b></td><td>${metaData.order.orderItems[i].quantity}</td></tr><tr><td><b>Printer</b></td><td>${metaData.order.orderItems[i].printer}</td></tr><tr><td><b>Material</b></td><td>${metaData.order.orderItems[i].material}</td></tr><tr><td><b>Color</b></td><td>${metaData.order.orderItems[i].color}</td></tr><tr><td><b>Infill</b></td><td>${metaData.order.orderItems[i].infill}</td></tr><tr><td><b>LayerHeight</b></td><td>${metaData.order.orderItems[i].layerHeight}</td></tr><tr><td><b>Finishing</b></td><td>${metaData.order.orderItems[i].finishing}</td></tr><tr><td><b>unit</b></td><td>${metaData.order.orderItems[i].unit}</td></tr>`
            }  
            let formData2 = '</tbody></table>'+
            '</div></body></html>';
            let formData=formData1+temp+formData2;

            //console.log(formData);

            axios.post(window.Metri_Config.VUE_APP_BASE_SES_LAMBDA_URL,
              formData,
              
              {
               
                headers: {
                   
                   'Content-Type': 'application/json'
                 
               },
              
              }

            ).then(function(response){
              
              if (response='ok'){
                console.log('Mail sended');
              }
            })
            .catch(function(error){
              console.log(error);
              self.$router.push({ path: 'upload_error'});
             
            });

          },
          // Stripe payment
          async createStripePaymentLink(orderId,amount) {
            var self = this;
            const d = new Date();
            let ms = d.valueOf(); // unique timestamp
            let taxCode = "txcd_10000000"  // General - Electronically Supplied Services https://stripe.com/docs/tax/tax-categories
            try {
              let myBody = {"productName": ms+orderId,"amount":amount,"taxCode":taxCode}
              console.log(myBody);
              const response = await axios.post(
                window.Metri_Config.VUE_APP_BASE_CREATE_STRIPE_PAYMENT_LINK_URL,
                myBody
              );
              console.log('Create Stripe Payment Link');
              console.log(response.data.paymentLink.url);
              return response.data.paymentLink.url;
            } catch (error) {
              console.log(error);
              self.$router.push({ path: 'upload_error'});
            }
          },

        }//methods
    }//export
</script>