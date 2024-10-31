<template>
  <div>
    <div v-for="(item,index) in items" :key="item.id">
      <v-card class="blue-grey darken-3 pa-1 mb-2">
        <v-layout row wrap class="mb-1">
          <v-flex xs12 sm12 md6>
            <!-- sol kart tarafı -->
            <v-card>
              <div class="pa-1">
                <model-stl :src="item.src" @measured="haha($event,index)"></model-stl>
              </div>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-3">{{item.name}}</h3>
                  <div class="subtitle mb-1">
                    <model-info @unitChanged="updateUnit($event,index)" :X="item.X" :Y="item.Y" :Z="item.Z" :volume="item.volume.toFixed(2)"></model-info>
                  </div>
                </div>
              </v-card-title>
            </v-card>

            <v-layout row class="mt-2">
              <v-flex xs12 md12>
                <div class="title font-weight-black white--text"> {{ $t("itemsComponent.price") }}: {{calculateItemPrice(item)}} </div>
                
              </v-flex>
            </v-layout>
            

            <v-layout row align-end>
              <v-flex xs12 md12>
                <v-btn color="#fd6c6e" class="font-weight-bold white--text" @click="sil(index)">
                  {{ $t('itemsComponent.delete') }}
                  <v-icon right>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>





          <!-- sol kart tarafı son -->
          <v-flex xs12 sm12 md6 fill-height>
            <!-- select tarafı -->
            <v-flex xs12 sm12 md12>
              <!-- select ust iki -->
              <v-layout row>
                <v-flex xs12 md12>
                                  <!-- Printer -->
                  <v-select dark
                                :items="initialPrinters"
                                v-model="item.selectedPrinter"
                                :label="$t('itemsComponent.printer')"
                                :hint="item.selectedPrinter.technology"
                                persistent-hint
                                item-text="label"
                                item-value="label"
                                return-object
                                @change="onChange($event,item.id,'printerSelect')">
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 md12>
                                  <!-- Materials -->
                  <v-select dark
                                v-if="item.printerMaterials.length"
                                :items="item.printerMaterials"
                                v-model="item.selectedMaterial"
                                :label="$t('itemsComponent.materials')"
                                :hint="item.selectedMaterial.material_type"
                                persistent-hint
                                item-text="label"
                                item-value="label"
                                return-object
                                @change="onChange($event,item.id,'materialSelect')">
                  </v-select>
                </v-flex>
              </v-layout>
                                <!-- Color do not effect to price -->
              <v-layout row >
                <v-flex xs2 md2 >
                  <v-sheet class="mt-3"
                    v-if="item.materialColors.length"
                    :color="item.selectedColor.rgb"
                    height="30"
                    width="30"
                  ></v-sheet>
                </v-flex>
                <v-flex xs10 md10>
                  <v-select dark
                                v-if="item.materialColors.length"
                                :items="item.materialColors"
                                v-model="item.selectedColor"
                                :label="$t('itemsComponent.color')"

                                item-text="label"
                                item-value="label"
                                return-object
                                @change="onChange($event,item.id,'colorSelect')">
                  </v-select>
                </v-flex>
              </v-layout>

                    <!-- Infills -->
              <v-layout row>
                <v-flex xs12 md12>
                  <v-select dark
                                v-if="item.materialInfills.length"
                                :items="item.materialInfills"
                                v-model="item.selectedInfill"
                                :label="$t('itemsComponent.infill')"
                                :hint="item.selectedInfill.percentage"
                                persistent-hint
                                item-text="label"
                                item-value="label"
                                return-object
                                @change="onChange($event,item.id,'infillSelect')">
                  </v-select>
                </v-flex>
              </v-layout>

                    <!-- layerHeights -->
               <v-layout row>
                <v-flex xs12 md12>
                  <v-select dark
                                v-if="item.materialLayerHeights.length"
                                :items="item.materialLayerHeights"
                                v-model="item.selectedLayerHeight"
                                :label="$t('itemsComponent.layerHeight')"

                                :hint="item.selectedLayerHeight.layerHeight"
                                persistent-hint
                                item-text="label"
                                item-value="label"
                                return-object
                                @change="onChange($event,item.id,'LayerHeightSelect')">
                  </v-select>
                </v-flex>
              </v-layout>

                     <!-- finishings -->
              <v-layout row>
                <v-flex xs12 md12>
                  <v-select dark
                                v-if="item.materialFinishings.length"
                                :items="item.materialFinishings"
                                v-model="item.selectedFinishing"
                                :label="$t('itemsComponent.finishing')"

                                :hint="item.selectedFinishing.description"
                                persistent-hint
                                item-text="label"
                                item-value="label"
                                return-object
                                @change="onChange($event,item.id,'FinishingSelect')">
                  </v-select>
                </v-flex>
              </v-layout>





            </v-flex>
            <!-- select ust iki son -->

            <!-- select ust iki son -->

          </v-flex>
          <!-- select tarafı son -->
        </v-layout>
      </v-card>
    </div>
    <!-- v-for son -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { ModelStl } from '../resources/vue-3d-model.esm';
import ModelInfo from '../components/ModelInfo';
import axios from 'axios';
import i18n from '@/plugins/i18n';

export default {
  props: ['initialPrinters'],
  name: "ItemsComponent2",
  components: {
    ModelStl,
    ModelInfo,
  },
  data() {
    return {
     // items: this.initialItems,


    }
  },
 
  computed: {
    ...mapState([
      'items'
    ]),

  }, //computed

  // watch: {
  //      state(Val){
  //       switch(Val) {
  //       case 0:  // printers initialized

  //         break;
  //       case 1:  // printer selected
  //         //console.log("printer selected");

  //         break;
  //       default:
  //         // code block
  //     }


  //       }


  // },

  methods: {


    haha(data, myindex) {
      //   console.log('src: '+ data.src);
      let volume = 0;
      volume = data.volume;
      this.items[myindex].volume = volume;
      // this.items[myindex].price = this.calculatePrice(this.items[myindex]);
      this.items[myindex].X = Math.round(data.boundingBox[0]);
      this.items[myindex].Y = Math.round(data.boundingBox[1]);
      this.items[myindex].Z = Math.round(data.boundingBox[2]);
      //console.log(this.$refs);
    },

    updateUnit(data, myindex) {
      this.items[myindex].unitFactor = data.factor;
      this.items[myindex].unit = data.text;

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

    calculateItemPrice(item) {
      // console.log(item);
      // let price = item.quantity * (
      //   (parseFloat(item.volume, 10) * Math.pow(parseFloat(item.unitFactor, 10), 3)) * //cubic
      //   parseFloat(item.meterialMultiplier, 10) *
      //   parseFloat(item.infillMultiplier, 10) *
      //   parseFloat(item.layerHeightMultiplier, 10) +
      //   parseFloat(item.finishingPrice, 10) +
      //   parseFloat(item.setupCost, 10));

        let price =0;


        if (Object.keys(item.selectedMaterial).length === 0) // malzeme secilmemisse
           item.selectedMaterial.pricepercm3 =0;
        if (Object.keys(item.selectedInfill).length === 0)
            item.selectedInfill.multiplier =0;
        if (Object.keys(item.selectedLayerHeight).length === 0)
            item.selectedLayerHeight.multiplier =0;
        if (Object.keys(item.selectedFinishing).length === 0)
            item.selectedFinishing.price =0;

        let setupCost = 0;

        let volume = parseFloat(item.volume, 10) * Math.pow(parseFloat(item.unitFactor, 10), 3);
        let materialCost = volume * parseFloat(item.selectedMaterial.pricepercm3, 10);
        let infillCost = volume * parseFloat(item.selectedInfill.multiplier, 10);
        let layerHeightCost = volume * parseFloat(item.selectedLayerHeight.multiplier, 10);
        let finishingCost = parseFloat(item.selectedFinishing.price, 10);

        if (item.selectedMaterial.setup_costs){
          setupCost = parseFloat(item.selectedMaterial.setup_costs[0].price, 10);
          console.log(setupCost);
        }


        let subTotal = materialCost + infillCost + layerHeightCost + finishingCost + setupCost;
        price = item.quantity * subTotal;




      item.price = price;
      return this.formatMyMoney(price);


    },

    sil(mindex) {
      return this.items.splice(mindex, 1);
    },



    clearMaterialSubItems(item){

      item.selectedColor = {};
      item.selectedInfill ={};
      item.selectedLayerHeight ={};
      item.selectedFinishing ={};

      item.materialColors = [];
      item.materialInfills = [];
      item.materialLayerHeights = [];
      item.materialFinishings = [];
    },




    onChange(m, itemId, select) { //this onchange is for all selects
      this.items.forEach((item) => {
        if (item.id === itemId) {
          if (select == "printerSelect") {

          item.selectedMaterial = {};
          item.printerMaterials = [];

          this.clearMaterialSubItems(item);

          item.selectedPrinter = m ;
          item.printerMaterials = m.materials;

          }
          if (select == "materialSelect") {

            this.clearMaterialSubItems(item);

            item.selectedMaterial = m;

            item.materialColors = m.colors;
            if (item.materialColors.length > 0)
                item.selectedColor =item.materialColors[0];

            item.materialInfills = m.infills;
            if (item.materialInfills.length > 0)
                item.selectedInfill = item.materialInfills[0];

            item.materialLayerHeights = m.layer_heights;
            if (item.materialLayerHeights.length > 0)
                item.selectedLayerHeight = item.materialLayerHeights[0];

            item.materialFinishings = m.finishings;
            if (item.materialFinishings.length > 0)
                item.selectedFinishing = item.materialFinishings[0];


          }
          if (select == "colorSelect") {
             item.selectedColor = m;


          }
          if (select == "infillSelect") {
            item.selectedInfill = m;



          }
          if (select == "LayerHeightSelect") {
            item.selectedLayerHeight = m;



          }
          if (select == "FinishingSelect") {
            item.selectedFinishing = m;


          }





        }

      }); // foreach

    } //onchange end
  } //methods
} //export default
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>