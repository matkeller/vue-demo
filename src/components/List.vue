<template>
 <b-container>
    <b-row class="container-fluid">
      <b-col cols="12">
        <h2 align="center">{{msg}}</h2>

      <!-- Options for b-table:
                   per-page=5 responsive inverse small bordered striped hover :filter="filter" :items="permits" :fields="fields" -->
      <b-table responsive small striped hover :items="permits" :fields="fields">

      </b-table> 

      </b-col>
    </b-row>
 </b-container>
</template>



<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'list',
  data() {
    return {
      msg: 'List of Data',
      pagesize: 20,
      offset: 0,
      fields: {
        ApplicantName: {
          label: 'Applicant Name',
          sortable: true
        },
        ApproverName: {
          label: 'Approver Name',
          sortable: true
        },
        Description: {
          label: 'Description',
          sortable: true
        },
        Status: {
          label: 'Status',
          sortable: true
        },
        Type: {
          label: 'Type',
          sortable: true
        },
        SubmittedDate: {
          label: 'Submitted Date',
          sortable: true
        },
        StartDate: {
          label: 'Start Date',
          sortable: true
        },
        EndDate: {
          label: 'End Date',
          sortable: true
        },

      },
      permits: [{}],
    }
  },
  created: function() {
    this.loadData()
  },
  methods: {
    loadData: function() {
      this.status = "Loading............",     //TODO Show spinner notification
        this.permits = [{}];
      var vm = this;
      axios({
        //withCredentials: true,
        method: 'get',
        //Get base URL from /config/dev.env.js file
        //url: process.env.API_HOST + '/permits/v1/db:permits',
        url: process.env.API_HOST + '/list',

        headers: {
          'action': 'useToken',
          'token': vm.$authPlugin.getToken()
        },
        data: {
        }
      })
        .then(function(response) {

          
          var fixDates = response.data;
          var i, item;
           for (i = 0; i < fixDates.length; i++) {
            for (item in fixDates[i]) {
              if (item === "SubmittedDate") {
                fixDates[i][item] = moment(fixDates[i][item], "YYYY-MM-DD").format("MMM DD, YYYY");
              }
              if (item === "StartDate") {
                fixDates[i][item] = moment(fixDates[i][item], "YYYY-MM-DD").format("MMM DD, YYYY");
              }
              if (item === "EndDate") {
                fixDates[i][item] = moment(fixDates[i][item], "YYYY-MM-DD").format("MMM DD, YYYY");
              }
            }
          }
          vm.permits = fixDates;
         /// vm.permits = response.data;

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
    }
  }
}
</script>


<style>

</style>
