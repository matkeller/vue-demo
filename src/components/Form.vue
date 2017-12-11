<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <h2 align="center">Form</h2>

        <b-form @submit="onSubmit">
          <b-form-group label="Email address:" :horizontal="horizontal" description="We will never share your email with anyone else.">
            <b-form-input type="email" v-model="form.email" required placeholder="Enter email"></b-form-input>
          </b-form-group>

          <b-form-group label="Password:" :horizontal="horizontal">
            <b-form-input type="password" v-model="form.password" required placeholder="Enter password"></b-form-input>
          </b-form-group>

          <b-form-group label="Your Name:" :horizontal="horizontal">
            <b-form-input type="text" disabled v-model="form.name" required placeholder="Enter name"></b-form-input>
          </b-form-group>

          <b-form-group label="Food:" :horizontal="horizontal">
            <b-form-select :options="foods" required v-model="form.food"></b-form-select>
          </b-form-group>

          <b-form-group label="Pick Cars:" :horizontal="horizontal">
            <b-form-checkbox v-model="form.cars" value="Ford">Ford</b-form-checkbox>
            <b-form-checkbox v-model="form.cars" value="Chevy">Chevy</b-form-checkbox>
            <b-form-checkbox v-model="form.cars" value="Dodge">Dodge</b-form-checkbox>
          </b-form-group>

          <b-form-group label="Provide Comments:" :horizontal="horizontal">
            <b-form-textarea v-model="form.textbox" placeholder="Enter your comments (optional)" :rows="2" :max-rows="4">
            </b-form-textarea>
          </b-form-group>

          <b-form-group label="Permit Status:" :horizontal="horizontal">
            <b-form-radio id="myRadio" v-model="form.radioSelected" :options="radioData.options" stacked></b-form-radio>
          </b-form-group>

          <b-form-group label="Effective Date:" :horizontal="horizontal">
            <datepicker placeholder="Select Date" v-model="form.myDate" :format="dateFormat" 
                   :bootstrapStyling="true" :calendar-button="true"></datepicker>
            <br>Current date value: {{ form.myDate }}
          </b-form-group>

          <b-form-group label="Pick File to Upload:" :horizontal="horizontal">
            <b-form-file v-model="form.file"></b-form-file>
            <br> Selected file: {{form.file && form.file.name}}
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="secondary">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import Datepicker from 'vuejs-datepicker';  //https://github.com/charliekassel/vuejs-datepicker

export default {
  components: {
    Datepicker
  },
  name: 'form',
  data() {
    return {
      form: {
        email: '',
        password: '',
        name: 'Mat',
        food: '',
        cars: [],
        textbox: '',
        secret: 'S3CR3T',
        radioSelected: 'approved',
        myDate: new Date().toLocaleString("en-US", {timeZone: "America/New_York"}),
        file: null
      },
      horizontal: true,  //true puts labels beside fields if screen size allows it.
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn', 'foo'
      ],
      radioData: {
        options: [
          { text: 'Approved', value: 'approved' },
          { text: 'Denied', value: 'denied' },
          { text: 'Dis', value: 'dis', disabled: true }
        ]
      },
      dateFormat: "yyyy-MM-dd"     // 2017-09-21
      //dateFormat: "d MMM yyyy"     // 2 Feb 2016
      //dateFormat: "d MMMM yyyy"    // 2 February 2016
      //dateFormat: "dsu MMM yyyy"   //2th Feb 2016
      //dateFormat: "D dsu MMM yyyy" //Sat 12th Feb 2016
    }
  },
  updated: function() {
      this.form.myDate = this.form.myDate.toLocaleString("en-US", {timeZone: "America/New_York"});
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert("Success!  Here's the json: " + JSON.stringify(this.form));
    }
  }
};
</script>

<style>

</style>
