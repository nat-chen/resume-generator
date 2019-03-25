<template>
  <v-layout>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>简历编辑</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="primary" @click="submitResumeData">保存</v-btn>

      <v-btn @click="shareResume">分享</v-btn>
    </v-toolbar>

    <v-dialog
      v-model="shareResumeDialog"
      width="400"
    >
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="resumeWebsite"
            label=""
          ></v-text-field>
        </v-card-text>

        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn
            color=""
            @click="shareResumeDialog = false"
          >
            关闭
          </v-btn>
          <v-btn
            color="primary"
            @click="previewResume"
          >
            预览
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: function() {
    return {
      shareResumeDialog: false,
      resumeWebsite: '',
    }
  },
  methods: {
    submitResumeData: function() {
      this.$eventBus.$emit('save-form');
      this.$emit('save-resume-data');
    },
    shareResume: function() {
      this.shareResumeDialog = true;
      this.resumeWebsite = window.location.href.replace(/edit/, 'preview');
    },
    previewResume: function() {
      var userId = this.$route.params.id;
      this.shareResumeDialog = false;
      this.$router.push({ path: `/preview/${userId}` });
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
