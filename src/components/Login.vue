<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h2 align="center">Login Page</h2>
        <b-form @keyup.enter="login">
        
          <b-form-group label="Username:" :horizontal="horizontal">
            <b-form-input type="text" v-model="auth.username" required placeholder="Enter Username" autofocus></b-form-input>
          </b-form-group>

          <b-form-group label="Password:" :horizontal="horizontal">
            <b-form-input type="password" v-model="auth.password" required placeholder="Enter password"></b-form-input>
          </b-form-group>

          <b-form-group align="center">
            <b-button @click="login" variant="primary" v-b-modal.modal1>Submit</b-button>
          </b-form-group>

        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      status: "Starting",
      auth: {
        username: "",
        password: "",
        token: "",
        loggedIn: this.$authPlugin.loggedIn()
      },
      horizontal: true //true puts labels beside fields if screen size allows it.
    };
  },
  created: function() {
    //Everytime Login is called we destroy any old tokens
    this.$authPlugin.destroyToken()
  },
  methods: {
    login: function(evt) {
      this.status = "Loading.....";
      var vm = this;
      var expires;
      axios({
        withCredentials: true,
        //Axios creates an Authorization header from user/pass.  https://www.npmjs.com/package/axios
        auth: {
          username: vm.auth.username,
          password: vm.auth.password
        },
        method: "get",
        //TODO  Perhaps point to a special /auth page for clarity.  Right now it's going to /announcements or ANY
        //      page with the authentication getToken.  They all use the same fragement so any page will do.
        url: process.env.API_HOST + "/announcements",
        headers: {
          //'Authorization': 'CALiveAPICreator blahblah:1'
          //'Authorization': 'Basic blahblah'
          //'username': '',
          //'password': ''
          action: "getToken"
        },
        data: {}
      })
        .then(function(response) {
          (vm.status = "Got data!"),
            evt.preventDefault(),
            vm.$modal.show("alert-loggedIn"),
            //The Gateway handles JWT expiration, period and end of story.  For better user experience the duration for how long a JWT is valid
            //is sent as jwtValiditySec.  This lets the app gracefully handle token expiration without making a CORS call and a failed useToken call
            //to the Gateway in situations where this app already knows the JWT has expired.
            (expires = response.data.jwtValiditySec * 1000 + Date.now());
            vm.$authPlugin.setToken(response.data.token, expires);
            vm.$router.push({ name: vm.$route.query.redirect }); //Route to requested location
        })
        .catch(function(error) {
          //Any error we get we pop the same 401 error 
          vm.$modal.show("alert-authError")
          ///vm.$router.push("/login");
        });
    }
  }
};
</script>


<style>

</style>
