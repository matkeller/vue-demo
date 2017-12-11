<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h2 align="center">Logout</h2>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
export default {
  name: 'logout',
  data() {
    return {
    }
  },
  created: function() {
    this.$authPlugin.destroyToken()
    //alert("You have been logged out."),
    this.$modal.show('alert-loggedOut');
    this.$router.push({ name: 'home'}) 
  },
  methods: {

  }
}
</script>


<style>

</style>
