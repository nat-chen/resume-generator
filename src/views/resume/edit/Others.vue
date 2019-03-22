<template>
  <div class="others">
    <v-form class="my-2 pa-2"
      ref="form"
      v-model="isValidForm"
      lazy-validation
    >
      <v-textarea
        v-model="formData.sectionContent.selfdesp"
        auto-grow
        name="selfIntroduction"
        label="自我描述"
        rows="3"
        :rules="selfIntroductionRules"
        hint="不少于20个字"
      ></v-textarea>

      <v-text-field
        v-model="formData.sectionContent.socialLink"
        :rules="socialNetworkRules"
        label="社交主页"
        required
      ></v-text-field>

    </v-form>
  </div>
</template>

<script>
export default {
   props: {
    othersData: {
      type: Object,
    }
  },
  data: function() {
    return {
      isValidForm: '',
      selfIntroduction: '',
      socialNetwork: '',
      selfIntroductionRules: [
        value => !!value || '自我描述为必填项'
      ],
      socialNetworkRules: [
        value => !!value || '社交主页'
      ]
    }
  },
  computed: {
    formData: function() {
      var sectionTemplate = {
        resumeId: "",
        sectionName: "other",
        sectionContent: { selfdesp: "", socialLink: "" }
      }
      if (this.othersData.resumeId !== undefined) {
        sectionTemplate.resumeId = this.othersData.resumeId;
        sectionTemplate.sectionName = this.othersData.name;
        sectionTemplate.sectionContent =this.othersData.content;
      }
      return sectionTemplate;
    },
  },
  created: function() {
    this.$eventBus.$on('save-form', () => {
      this.$emit('save-form-data', this.formData);
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off('save-form');
  },
}
</script>

<style lang="sass" scoped>

</style>
