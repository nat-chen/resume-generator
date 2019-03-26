<template>
  <div class="basic-personal-info">
    <v-form class="my-4"
      ref="form"
      v-model="isFormValid"
      lazy-validation
    >
      <v-text-field
        v-model="sectionFormData.resume.name"
        label="姓名"
        required
      ></v-text-field>

      <v-text-field
        v-model="sectionFormData.resume.mobilePhone"
        label="手机号"
        required
      ></v-text-field>

      <v-text-field
        v-model="sectionFormData.section.sectionContent.studentNo"
        label="学号"
        required
      ></v-text-field>
      
      <date-picker
        v-model="sectionFormData.section.sectionContent.bornDate"
        labelName="出生年月"
        required
      ></date-picker>
      <v-radio-group v-model="gender" :mandatory="false" row>
        <v-radio label="男" value="true"></v-radio>
        <v-radio label="女" value="false"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="sectionFormData.section.sectionContent.workCity"
        label="所在城市"
        required
      ></v-text-field>

      <v-text-field
        v-model="sectionFormData.section.sectionContent.email"
        label="邮箱"
        required
      ></v-text-field>

      <date-picker
        v-model="sectionFormData.section.sectionContent.startWorkDate"
        labelName="参加工作时间"
        required
      ></date-picker> 

    </v-form>
  </div>
</template>

<script>

import DatePicker from '@/components/DatePicker.vue';

export default {
  props: {
    mergeBasicData: {
      type: Object,
    }
  },
  data: function() {
    return {
      isFormValid: true,
      sectionFormData: {
        section: {
          resumeId: '',
          sectionName: 'baseExtend',
          sectionContent: {studentNo: "", bornDate: "", workCity: "", email: "", startWorkDate: ""},
        },
        resume: {
          id:"",
          userId:"",
          name:"",
          sex: false,
          age: '',
          province: "",
          city: "",
          imgPath: "",
          mobilePhone: "",
          language: "zh-cn"
        },
      },
    }
  },
  computed: {
    gender: {
      get: function() {
        return (this.sectionFormData.resume.sex === false) ? "false" : "true";
      },
      set: function(value) {
        this.sectionFormData.resume.sex = Boolean(value);
      }
    },
  },
  watch: {
    mergeBasicData: {
      handler: function(newValue) {
        var mergeBasicData = newValue;
        if (newValue.resume.userId === undefined) {
          mergeBasicData = {
            resume: this.sectionFormData.resume,
            section: this.sectionFormData.section,
          }
        }
        this.sectionFormData = Object.assign({}, this.sectionFormData, mergeBasicData);
      },
      deep: true,
    }
  },
  created: function() {
    this.$eventBus.$on('save-form-data', () => {
      this.$emit('save-current-form', this.sectionFormData);
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off('save-form-data');
  },
  methods: {
    formValidate() {
      console.log(this.$refs.form.validate());
    },
  },
  components: {
    DatePicker,
  }
}
</script>

<style lang="sass" scoped>

</style>

