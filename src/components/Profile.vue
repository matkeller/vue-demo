<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h2 align="center">{{msg}}</h2>
        <b-form @submit="onSubmit">
          <b-form-group label="First Name:" :horizontal="horizontal">
            <b-form-input v-model="profile.FirstName"></b-form-input>
          </b-form-group>

          <b-form-group label="Last Name:" :horizontal="horizontal">
            <b-form-input v-model="profile.LastName"></b-form-input>
          </b-form-group>

          <b-form-group label="Street Address:" :horizontal="horizontal">
            <b-form-input v-model="profile.StreetAddress"></b-form-input>
          </b-form-group>

          <b-form-group label="City:" :horizontal="horizontal">
            <b-form-input v-model="profile.City"></b-form-input>
          </b-form-group>

          <b-form-group label="State:" :horizontal="horizontal">
            <b-form-input v-model="profile.State"></b-form-input>
          </b-form-group>

          <b-form-group label="Zip:" :horizontal="horizontal">
            <b-form-input type="number" v-model="profile.ZipCode" placeholder="Digits only"></b-form-input>
          </b-form-group>

          <b-form-group label="License Number:" :horizontal="horizontal">
            <b-form-input v-model="profile.LicenseNumber"></b-form-input>
          </b-form-group>

          <b-form-group label="Phone Number:" :horizontal="horizontal">
            <b-form-input v-model="profile.PhoneNumber" placeholder="###-###-####"></b-form-input>
          </b-form-group>

          <b-form-group label="E-mail:" :horizontal="horizontal">
            <b-form-input type="email" v-model="profile.Email"></b-form-input>
          </b-form-group>


          <b-form-group :horizontal="horizontal">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="secondary">Reset</b-button>
          </b-form-group>
        </b-form>

        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'profile',
  data() {
    return {
      msg: 'Update Profile',
      profile: {
 /***       
        "Id": "",
        "FirstName": "",
        "LastName": "",
        "StreetAddress": "",
        "City": "",
        "State": "",
        "ZipCode": "",
        "LicenseNumber": "",
        "PhoneNumber": "",
        "Email": ""
***/        
      },
      horizontal: true,  //true puts labels beside fields if screen size allows it.
    }
  },
  created: function() {
    this.loadData()
  },
  methods: {
    loadData: function() {
      this.status = "Loading............",     //TODO Show spinner notification
      this.profile = {};
      var vm = this;
      axios({
        //withCredentials: true,
        method: 'get',
        //Get base URL from /config/dev.env.js file
        url: process.env.API_HOST + '/profile',

        headers: {
          'action': 'useToken',
          'token': vm.$authPlugin.getToken()
        },
        data: {
        }
      })
        .then(function(response) {
          vm.profile = response.data;
          vm.status = "Data last refreshed " + moment(Date.now()).format("MMM DD, YYYY")
            + " at " + moment(Date.now()).format("HH:mm:ss a");
          ///alert("Data retrieved")
        })
        .catch(function(error) {
          if (error.response.status === 401) {
            //alert("Your session has time out.  Please login again."),
            vm.$modal.show('alert-loggedOut'),
              vm.$router.push('/login')
          } else {
            alert('An error occurred.  It is: ' + error);
          }
        });

    },


    onSubmit(evt) {
      evt.preventDefault();
      //alert("Success!  Here's the json: " + JSON.stringify(this.profile));
      this.insertData();
    },


    insertData: function() {
      var vm = this;
      axios({
        method: 'put',
        //Get base URL from /config/dev.env.js file
        url: process.env.API_HOST + '/profile',

        headers: {
          'action': 'useToken',
          'token': vm.$authPlugin.getToken()
        },
        data: {
          "Id": vm.profile.id,   //Not a hidden field.  Id was populated on creation and never overwritten by form submission.
          "FirstName": vm.profile.FirstName,
          "LastName": vm.profile.LastName,
          "StreetAddress": vm.profile.StreetAddress,
          "City": vm.profile.City,
          "State": vm.profile.State,
          "ZipCode": vm.profile.ZipCode,
          "LicenseNumber": vm.profile.LicenseNumber,
          "PhoneNumber": vm.profile.PhoneNumber,
          "Email": vm.profile.Email
        }
      })
        .then(function(response) {
          ///////vm.facilities = response.data;
          vm.$modal.show('alert-dataSuccess');
          //alert("Success! Data Inserted: " + JSON.parse(JSON.stringify(response.data)))
        })
        .catch(function(error) {
          if (error.response.status === 401) {
            vm.$modal.show('alert-loggedOut'),
              vm.$router.push('/login')
          } else {
            vm.$modal.show('alert-dataError');
            //alert('An error occurred.  It is: ' + error);
          }
        });
    }
  }
}
</script>

<style>

</style>