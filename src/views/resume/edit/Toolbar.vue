<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>简历编辑</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn color="primary" @click="submitResumeData">保存</v-btn>

    <v-btn @click="shareResume">分享</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data: function() {
    return {

    }
  },
  methods: {
    submitResumeData: function() {
      this.$emit('save-resume-data');
      this.$eventBus.$emit('save-form');
    },
    shareResume: function() {

    }
  }
}
</script>

<style lang="sass" scoped>

</style>
