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
								      type="error"
								    >
								      
				                    <div class="icon-box">
				                              <i class="material-icons">!</i>
				                    </div>

							        <h1>{{ $t("uploadError.head1") }}</h1>
							        <p>{{ $t("uploadError.head2") }}</p>
							        <router-link to="/" exact>
							            <v-btn outline color="white">{{ $t("uploadError.button") }}</v-btn>
							            
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

import toolbar from "../../components/toolbar";
import myfooter from "../../components/myfooter";

export default {
    name: "uploadFailed",
    components: {
        toolbar,
        myfooter,
    },
};
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
    color: #FF5252;
   
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 5px;
    width: 95px;
    height: 95px;
    border-radius: 50%;
    z-index: 9;
    background: #FAFAFA;
    padding: 5px;
    text-align: center;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}
</style>