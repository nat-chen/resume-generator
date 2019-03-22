<template>
  <v-app>
    <v-content>
      <v-container fluid pa-0>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginResume from './views/resume/login/LoginResume.vue';
import PreviewResume from './views/resume/preview/PreviewResume.vue';

export default {
  name: 'App',
  components: {
    LoginResume,
    PreviewResume,
  },
  data () {
    return {
      //
    }
  }
}
</script>
