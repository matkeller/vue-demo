<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h2 align="center">{{msg}}</h2>
        <b-form @submit="onSubmit">

          <b-form-group label="Applicant Info:" :horizontal="horizontal">
            {{ profile.FirstName }} {{ profile.LastName }} <br>
            {{ profile.StreetAddress }} <br>
            {{ profile.City }}, {{ profile.State }}  {{ profile.ZipCode }} <br>
            {{ profile.PhoneNumber }} <br>
            {{ profile.Email }} <br>   
            License Number: {{ profile.LicenseNumber }} <br>      
          </b-form-group>

          <b-form-group label="Permit Type:" :horizontal="horizontal">
            <b-form-select id="type" v-model="permit.PermitTypeId" :options="PermitTypeIdOptions" required ></b-form-select>
          </b-form-group>

          <b-form-group label="Description: *" :horizontal="horizontal">
            <b-form-textarea :rows="3" :max-rows="6" v-model="permit.Description" required></b-form-textarea>
          </b-form-group>

          <b-form-group label="Start Date:" :horizontal="horizontal">
            <datepicker placeholder="Select Date" v-model="permit.StartDate" :format="dateFormat" 
                   :bootstrapStyling="true" :calendar-button="true"></datepicker>
          </b-form-group>

          <b-form-group label="End Date:" :horizontal="horizontal">
            <datepicker placeholder="Select Date" v-model="permit.EndDate" :format="dateFormat" 
                   :bootstrapStyling="true" :calendar-button="true"></datepicker>
          </b-form-group>


          <b-form-group :horizontal="horizontal">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="secondary">Reset</b-button>
          </b-form-group>
        </b-form>

      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker"; //https://github.com/charliekassel/vuejs-datepicker
import moment from "moment";

export default {
  components: {
    Datepicker
  },
  name: "submit",
  data() {
    return {
      msg: "Submit Request",
      debug: "",
      profile: {
        Id: "",
        FirstName: "",
        LastName: "",
        StreetAddress: "",
        City: "",
        State: "",
        ZipCode: "",
        LicenseNumber: "",
        PhoneNumber: "",
        Email: ""
      },
      permit: {
        ApplicantId: "",
        Description: "",
        StatusId: "1",
        PermitTypeId: "",     
        StartDate: new Date(),
        EndDate: new Date()
      },
      PermitTypeIdOptions: [
        { text: "Fishing Permit", value: "1" },
        { text: "Hunting Permit", value: "2" }
      ],
      dateFormat: "yyyy-MM-dd", // For display on the Date Picker only.
      horizontal: true //true puts labels beside fields if screen size allows it.
    };
  },

  created: function() {
    this.loadData();
  },
  updated: function() {
  },
  methods: {
    loadData: function() {
      (this.status = "Loading............"), //TODO Show spinner notification
        (this.profile = {});
      var vm = this;
      axios({
        method: "get",
        //Get base URL from /config/dev.env.js file
        url: process.env.API_HOST + "/profile",

        headers: {
          action: "useToken",
          token: vm.$authPlugin.getToken()
        },
        data: {}
      })
        .then(function(response) {
          vm.profile = response.data;
          vm.status =
            "Data last refreshed " +
            moment(Date.now()).format("MMM DD, YYYY") +
            " at " +
            moment(Date.now()).format("HH:mm:ss a");
          ///alert("Data retrieved")
        })
        .catch(function(error) {
          if (error.response.status === 401) {
            //alert("Your session has time out.  Please login again."),
            vm.$modal.show("alert-loggedOut"), vm.$router.push("/login");
          } else {
            alert("An error occurred.  It is: " + error);
          }
        });
    },

    onSubmit(evt) {
      evt.preventDefault();
      //alert("Success!  Here's the json: " + JSON.stringify(this.permit));
      this.insertData();
    },
    insertData: function() {
      var vm = this;
      axios({
        method: "post",
        //Get base URL from /config/dev.env.js file
        url: process.env.API_HOST + "/submit",

        headers: {
          action: "useToken",
          token: vm.$authPlugin.getToken()
        },
        data: {
          ApplicantId: vm.profile.Id,
          Description: vm.permit.Description,
          StatusId: "1",
          PermitTypeId: vm.permit.PermitTypeId,
          //The datepicker needs a javascript Date() to work.
          //Right before we send the Dates off we will use Moment js to format them
          StartDate: moment(vm.permit.StartDate).format(),
          EndDate: moment(vm.permit.EndDate).format()
        }
      })
        .then(function(response) {
          vm.$modal.show("alert-permitSubmitted");
          vm.debug = response;
          //alert("Success! Data Inserted: " + JSON.parse(JSON.stringify(response.data)))
        })
        .catch(function(error) {
          if (error.response.status === 401) {
            vm.$modal.show("alert-loggedOut"), vm.$router.push("/login");
          } else {
            vm.$modal.show("alert-dataError");
            //alert('An error occurred.  It is: ' + error);
          }
        });
    }
  }
};
</script>

<style>

</style>