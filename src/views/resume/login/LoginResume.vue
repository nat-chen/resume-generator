<template>
  <div class="loginResume">
    <login />

    <register />
  </div>
</template>

<script>
import Login from '@/views/resume/login/Login.vue';
import Register from '@/views/resume/login/Register.vue';


export default {
  name: 'loginResume',
  data: function() {
    return {
    }
  },
  mounted: function() {

  },
  components: {
    Login,
    Register
  }
}
</script>


<style lang="sass" scoped>

</style>
