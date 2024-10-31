import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
   items:[],
  
  },

  mutations: {
    ADD_TO_ITEMS (state, payload) {
            state.items.push(payload);
    
    },
  },

  getters: {
    cartTotal: state => {
          let total = 0;
          state.items.forEach((item) => {
              total += parseFloat(item.price, 10);
          });
          return total;

    },
    anyZeroItemPrice: state => {
          let result = false;
          state.items.forEach((item) => {
              if (parseFloat(item.price, 10)==0) {
                result = true;
              } 
          });
          return result;

    }

   
  },//getters
  actions:{

  }
})