<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h1>{{ msg }}</h1>
        <div>
          <!-- Options for b-table:
                   per-page=5 responsive inverse small bordered striped hover :filter="filter" :items="permits" :fields="fields" -->
          <b-table responsive small striped hover :items="announcements" :fields="fields">
          </b-table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "announcements",
  data() {
    return {
      msg: "Important Announcements",
      status: "Starting",
      pagesize: 20,
      offset: 0,
      fields: {
        SubmittedDate: {
          label: 'Submitted Date',
          sortable: true
        },
        Message: {
          label: "Message",
          sortable: true
        }
      },
      announcements: [{}]
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      (this.status = "Loading............"), //TODO Show spinner notification
        (this.announcements = [{}]);
      var vm = this;
      axios({
        //withCredentials: true,
        method: "get",
        //Get base URL from /config/dev.env.js file
        //url: process.env.API_HOST + '/announcements/v1/db:announcements',
        url: process.env.API_HOST + "/announcements",

        headers: {
          action: "useToken",
          token: vm.$authPlugin.getToken()
        },
        data: {}
      })
        .then(function(response) {
          ///vm.status = "Got data!";
          //Fix the formatting of dates to be easier to read
          var fixDates = response.data;
          var i, item;
           for (i = 0; i < fixDates.length; i++) {
            for (item in fixDates[i]) {
              if (item === "SubmittedDate") {
                fixDates[i][item] = moment(fixDates[i][item], "YYYY-MM-DD").format("MMM DD, YYYY");
              }
            }
           }
          vm.announcements = fixDates;

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
    nextPage: function() {
      this.offset += 20;
      /////alert('nextPage offset is: ' + this.offset);
      this.loadData();
    },
    previousPage: function() {
      if (this.offset >= 20) this.offset -= 20;
      /////alert('previousPage offset is: ' + this.offset);
      this.loadData();
    }
  }
};
</script>


<style>

</style>
