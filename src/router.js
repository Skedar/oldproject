import Vue from 'vue'
import Router from 'vue-router'
import Fiyat3D from './views/Fiyat3D.vue'
import CheckoutStepper from './views/CheckoutStepper.vue'
import stripeForm from './views/stripeForm.vue'
import Success from './views/Success.vue'
import uploadFailed from './views/errors/uploadFailed.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'fiyat',
      component: Fiyat3D
    },
    {
      path: '/checkout',
      name: 'checkoutStepper',
      component: CheckoutStepper
    },
    {
      path: '/form',
      name: 'stripeForm',
      component: stripeForm
    },

// iyzico form
//    {
//      path: '/form',
//      name: 'form',
//      // route level code-splitting
//      // this generates a separate chunk (about.[hash].js) for this route
//      // which is lazy-loaded when the route is visited.
//      component: () => import(/* webpackChunkName: "about" */ './views/FormContainer.vue')
//    },


    
    {
      path: '/upload_error',
      name: 'uploadFailed',
      component: uploadFailed
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    },
  ]
})
