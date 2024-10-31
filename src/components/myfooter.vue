<template>
  


  <v-footer
    height="auto"
    color="blue-grey darken-3"
  >
    <v-layout
      justify-center
      row
      wrap
    >
 
      <v-flex
        blue-grey darken-3
        py-3
        text-xs-center
        white--text
        xs12
      >
           <div class="white--text ml-3">
              Made with
              <v-icon class="white--text">mood</v-icon>
             
              by <a class="white--text" href="https://codecanyon.net/user/makerstoragellc">MakerStorage LLC</a>
            </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>


<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ]
    })
  }
</script>


<style scoped>

</style>
