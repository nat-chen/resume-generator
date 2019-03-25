<template>
  <div class="basic-personal-info">
    <v-form class="my-4"
      ref="form"
      v-model="isFormValid"
      lazy-validation
    >
      <v-text-field
        v-model="sectionFormData.resume.name"
        :rules="nameRules"
        label="姓名"
        required
      ></v-text-field>

      <v-text-field
        v-model="sectionFormData.resume.mobilePhone"
        :rules="mobileRules"
        label="手机号"
        required
      ></v-text-field>

      <v-text-field
        v-model="sectionFormData.section.sectionContent.studentNo"
        :rules="studentIdRules"
        label="学号"
        required
      ></v-text-field>
      
      <date-picker
        v-model="sectionFormData.section.sectionContent.bornDate"
        labelName="出生年月"
        :rules="bornDateRules"
        required
      ></date-picker>
      <v-radio-group v-model="sectionFormData.resume.sex" :mandatory="false" row>
        <v-radio label="男" value="true"></v-radio>
        <v-radio label="女" value="false"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="sectionFormData.section.sectionContent.workCity"
        :rules="cityRules"
        label="所在城市"
        required
      ></v-text-field>

      <v-text-field
        v-model="sectionFormData.section.sectionContent.email"
        :rules="emailRules"
        label="邮箱"
        required
      ></v-text-field>

      <date-picker
        v-model="sectionFormData.section.sectionContent.startWorkDate"
        labelName="参加工作时间"
        :rules="startWorkDateRules"
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
      nameRules: [
        value => !!value || '姓名为必填项',
      ],
      emailRules: [
        value => !!value || '邮箱为必填项',
        value => /.+@.+\..+/.test(value) || '邮箱格式无效'
      ],
      mobileRules: [
        value => !!value || '手机号为必填项',
        value => /^1[3-9][0-9]{9}$/.test(value) || '手机号码格式无效'
      ],
      studentIdRules: [
        value => !!value || '学号为必填项',
      ],
      cityRules: [
        value => !!value || '城市为必填项',
      ],
      bornDateRules: [
        value => !!value || '出生年月为必选项',
      ],
      startWorkDateRules: [
        value => !!value || '参加工作时间为必选项',
      ],
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
          sex: true,
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
    this.$eventBus.$on('save-form', () => {
      this.$emit('save-form-data', this.sectionFormData);
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off('save-form');
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

