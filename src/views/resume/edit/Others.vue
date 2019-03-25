<template>
  <div class="others">
    <v-form class="my-2 pa-2"
      ref="form"
      v-model="isValidForm"
      lazy-validation
    >
      <v-textarea
        v-model="sectionFormData.sectionContent.selfdesp"
        auto-grow
        name="selfIntroduction"
        label="自我描述"
        rows="3"
        :rules="selfIntroductionRules"
        hint="不少于20个字"
      ></v-textarea>

      <v-text-field
        v-model="sectionFormData.sectionContent.socialLink"
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
    otherData: {
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
      ],
      sectionFormData: {
        resumeId: '',
        sectionName: 'other',
        sectionContent: { selfdesp: "", socialLink: "" },
      },
    }
  },
  watch: {
    otherData: {
      handler: function(newValue) {
        this.sectionFormData = Object.assign({}, this.sectionFormData, newValue);
      },
      deep: true,
    }
  },
  computed: {
    _sectionFormData: function() {
      this.sectionFormData = Object.assign({}, this.sectionFormData, this.otherData);
    },
  },
  created: function() {
    this.$eventBus.$on('save-form', () => {
      this.$emit('save-form-data', this.sectionFormData);
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off('save-form');
  },
}
</script>

<style lang="sass" scoped>

</style>
