<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h2 align="center">{{msg}}</h2>
        <b-form @submit="onSubmit">
          <b-form-group label="Facility Name: *" :horizontal="horizontal">
            <b-form-input v-model="facility.facilityName" required placeholder="Required field"></b-form-input>
          </b-form-group>

          <b-form-group label="Facility Room: *" :horizontal="horizontal">
            <b-form-input type="number" v-model="facility.facilityRoom" required placeholder="Required field, Digits only"></b-form-input>
          </b-form-group>

          <b-form-group label="Facility Status: *" :horizontal="horizontal">
            <b-form-radio v-model="facility.facilityStatus" :options="facilityStatusOptions" required />
          </b-form-group>

          <b-form-group label="First Name:" :horizontal="horizontal">
            <b-form-input v-model="facility.firstName"></b-form-input>
          </b-form-group>

          <b-form-group label="Last Name:" :horizontal="horizontal">
            <b-form-input v-model="facility.lastName"></b-form-input>
          </b-form-group>

          <b-form-group label="Email address:" :horizontal="horizontal">
            <b-form-input type="email" v-model="facility.email"></b-form-input>
          </b-form-group>

          <b-form-group label="Phone:" :horizontal="horizontal">
            <b-form-input type="number" v-model="facility.phone" placeholder="Digits only"></b-form-input>
          </b-form-group>

          <b-form-group label="Street Address:" :horizontal="horizontal">
            <b-form-input v-model="facility.street"></b-form-input>
          </b-form-group>

          <b-form-group label="City:" :horizontal="horizontal">
            <b-form-input v-model="facility.city"></b-form-input>
          </b-form-group>

          <b-form-group label="State:" :horizontal="horizontal">
            <b-form-input v-model="facility.state"></b-form-input>
          </b-form-group>

          <b-form-group label="Zip:" :horizontal="horizontal">
            <b-form-input type="number" v-model="facility.zip" placeholder="Digits only"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="secondary">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'manage',
  data() {
    return {
      msg: 'Manage Facilities',
      facility: {
        "facilityName": "",
        "facilityRoom": "",
        "facilityStatus": "booked",  //set a safe default value
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "street": "",
        "city": "",
        "state": "",
        "zip": ""
      },
      facilityStatusOptions: [
        { text: 'Available', value: 'available' },
        { text: 'Booked', value: 'booked' }
      ],
      horizontal: true,  //true puts labels beside fields if screen size allows it.
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      //alert("Success!  Here's the json: " + JSON.stringify(this.facility));
      this.insertData();
    },
    insertData: function() {
      var vm = this;
      axios({
        method: 'post',
        //Get base URL from /config/dev.env.js file
        url: process.env.API_HOST + '/lapoc',

        headers: {
          'action': 'useToken',
          'token': vm.$authPlugin.getToken()
        },
        data: {
          "facilityName": vm.facility.facilityName,
          "facilityRoom": vm.facility.facilityRoom,
          "facilityStatus": vm.facility.facilityStatus,
          "firstName": vm.facility.firstName,
          "lastName": vm.facility.lastName,
          "email": vm.facility.email,
          "phone": vm.facility.phone,
          "street": vm.facility.street,
          "city": vm.facility.city,
          "state": vm.facility.state,
          "zip": vm.facility.zip
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