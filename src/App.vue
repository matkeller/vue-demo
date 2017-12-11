<template>
  <!-- Top Navbar for entire site -->
  <div id="app">
    <b-navbar toggleable="sm" type="dark" variant="dark" sticky>
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand :to="{ name: 'home' }">Vue.js Demo </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item :to="{ name: 'announcements' }">Announcements</b-nav-item>
          <b-nav-item :to="{ name: 'submit' }">Submit</b-nav-item>
          <b-nav-item :to="{ name: 'list' }">List</b-nav-item>
        </b-nav>

        <!-- Right aligned nav items -->
        <b-nav is-nav-bar class="ml-auto">
           <b-nav-item :to="{ name: 'profile' }">Profile</b-nav-item>
          <span v-if="this.$authPlugin.loggedIn()">
            <b-nav-item :to="{ name: 'logout' }">Logout</b-nav-item>
          </span>
          <span v-else>
            <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          </span>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <modal name="alert-authError" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Authentication Error</b> </div>
    </modal>

    <modal name="alert-loggedIn" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Success:</b>  You are logged in.</div>
    </modal>

    <modal name="alert-loggedOut" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Success:</b> You have been logged out.</div>
    </modal>

    <modal name="alert-timedOut" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Error:</b>  Your session timed out.</div>
    </modal>

    <modal name="alert-dataSuccess" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Success:</b>  Data has been added or updated.</div>
    </modal>

    <modal name="alert-dataError" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Error:</b>  An error occurred sending your data.</div>
    </modal>
    
    <modal name="alert-permitSubmitted" :adaptive="true" :width="350" :height="150" :pivotX=".5" :pivotY=".2">
      <div align="center"> <p> &nbsp;</p><b>Success:</b>  Your permit request has been submitted for review.</div>
    </modal>


    <!-- Router view injection -->
    <router-view></router-view>

  </div>
</template>


<script>
export default {
  name: 'app',
  data() {
    return {
    }
  }
}
</script>


<style src="./assets/mat.css">
#app {
  /* 
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: subpixel-antialiased;

  font-family: Century Gothic, Verdana, sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
*/
  color: #000000;
  margin-top: 0px;
}
</style>
