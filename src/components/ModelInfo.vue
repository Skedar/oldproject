<template>
<div>	
    <v-layout row >
          <v-flex xs12 md12>
            <div><b> {{ $t('modelInfo.box') }} : </b>[X: {{X}}{{selectedUnit.text}} x Y: {{Y}}{{selectedUnit.text}} x Z: {{Z}}{{selectedUnit.text}}]</div>
            <div><b> {{ $t('modelInfo.volume') }} : </b> {{volume*1000}} {{selectedUnit.text}}³</div>
          </v-flex>
    </v-layout>
    <v-layout row justify-center mt-2>
    	<v-flex xs12 md12>
   
	    	<v-chip small
			  v-for="unit in units" 
			  :key="unit.id" 
			  :selected="unit.selected"
			  @click="onSelect(unit)"
			  
			>
			  <v-avatar :color="unit.color">{{unit.text}}</v-avatar>
			  {{unit.name}}
			</v-chip>	
		</v-flex>
    </v-layout>	

	
</div>  
</template>
<script>
export default {
    props: ['X','Y','Z','volume'],
    data(){
    	return {
    		selectedUnit:{text: 'mm',name:'milimeter',factor:1},
    		units: [{id: 1, text: 'mm', name:'milimeter', color: "#1ebacf", selected:true, factor:1},
    		        {id: 2, text: 'cm', name:'centimeter', color: "#c7f1bc", selected:false, factor:10},
    		        {id: 3, text: 'in', name:'inch', color: "#ffe94f", selected:false, factor:25.4},    
		           ]
    	}
    },
    methods: {
        onSelect(unit){
            var self = this;
            self.selectedUnit.text=unit.text;
            self.selectedUnit.name=unit.name;
            self.selectedUnit.factor=unit.factor;          
            
            self.units.forEach((item) => {
            	if (item.id===unit.id){
            		item.selected = true;
            	} else {
            		item.selected = false;
            	}

            });
          	
          	this.$emit('unitChanged',self.selectedUnit);
            // console.log('selected: '+ unit.text);
        }
    }
}
</script>
