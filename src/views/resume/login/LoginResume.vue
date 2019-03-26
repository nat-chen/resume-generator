<template>
  <div class="loginResume">
    <v-progress-linear class="ma-0" v-if="isLogging" :indeterminate="true"></v-progress-linear>
    <snackbar :isSnackbarShow="isSnackbarShow" :snackbarText="snackbarText" @snackbar-display="snackbarDisplay"/>
    <login />
    <register />
  </div>
</template>

<script>
import Login from '@/views/resume/login/Login.vue';
import Register from '@/views/resume/login/Register.vue';
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'loginResume',
  data: function() {
    return {
      isLogging: false,
      snackbarText: '',
      isSnackbarShow: false,
    }
  },
  created: function() {
    this.$eventBus.$on('is-logging-snackbar', (value) => {
      this.isLogging = value;
    });
    this.$eventBus.$on('invalid-status-login', (value, text) => {
      this.isSnackbarShow = value;
      this.snackbarText = text;
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off('is-logging-snackbar');
    this.$eventBus.$off('invalid-status-login')
  },
  methods: {
    snackbarDisplay: function() {
      this.isSnackbarShow = false;
    },
  },
  components: {
    Login,
    Register,
    Snackbar,
  }
}
</script>


<style lang="sass" scoped>

</style>
