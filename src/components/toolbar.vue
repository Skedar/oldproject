<template>

  <div>

    <v-toolbar app dark class="blue-grey darken-3" height="50">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <router-link to="/" exact>
              <v-toolbar-title class = "white--text" v-text="title"></v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>



         
    </v-toolbar>
  </div>
</template>
<script>
export default {
    props: ['title'],
    name: "toolbar",
    data(){
      return {

      }
    },
    methods: {

    }
}
</script>
<style scoped>

</style>
