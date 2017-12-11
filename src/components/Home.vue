<template>
  <div class="home">
    <b-container class="myrow">
      <b-row align-h="center">
        <h1>{{ msg }}</h1>
      </b-row>

      <b-row align-h="center">
        <b-col cols="8">
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
          <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. </p>


        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: 'Home'
    }
  }
}
</script>

<style>

</style>