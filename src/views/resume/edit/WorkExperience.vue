<template>
  <div class="work-experience">
    <v-btn flat icon @click="addNewItem">
      <v-icon>add</v-icon>
    </v-btn>

    <v-form class="grey lighten-3 my-4 pa-2" 
      v-for="(item, index) in formData.sectionContent" :key="index"
      ref="form"
      v-model="isFormValid"
      lazy-validation
    >
      <v-text-field
        v-model="item.companyName"
        :rules="companyNameRules"
        label="公司名称"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.domain"
        :rules="industryRules"
        label="行业"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.dept"
        :rules="departmentRules"
        label="部门"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.title"
        :rules="jobTitleRules"
        label="职位"
        required
      ></v-text-field>
      <v-layout row>
        <v-flex>
          <date-picker
            v-model="item.startDate"
            labelName="开始时间"
            :rules="startTimeRules"
            required>
          ></date-picker>
        </v-flex>
        <v-flex>
          <date-picker
            v-model="item.endDate" 
            labelName="结束时间"
            :rules="endTimeRules"
            required>
          ></date-picker>
        </v-flex>
      </v-layout>
      <v-textarea
        auto-grow
        v-model="item.summary"
        :rules="jobDescriptionRules"
        required
        label="工作内容简介"
        rows="3"
        hint="不少于20个字"
      ></v-textarea>

      <v-btn flat icon @click="deleteSelectedItem(index)">
        <v-icon color="red">delete</v-icon>
      </v-btn>

    </v-form>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue';

export default {
  props: {
    workExperienceData: {
      type: Object,
    }
  },
  data: function() {
    return {
      companyNameRules: [
        value => !!value || '公司名称为必填项'
      ],
      industryRules: [
        value => !!value || '行业为必填项'
      ],
      departmentRules: [
        value => !!value || '部门为必填项'
      ],
      jobTitleRules: [
        value => !!value || '职位为必填项'
      ],
      jobDescriptionRules: [
        value => !!value || '工作内容为必填项'
      ],
      startTimeRules: [
        value => !!value || '开始时间为必选项'
      ],
      endTimeRules: [
        value => !!value || '结束时间为必选项'
      ],
      isFormValid: true,
    }
  },
  computed: {
    formData: function() {
      var sectionTemplate = {
        resumeId: "",
        sectionName: "workExperience",
        sectionContent: [{companyName: "", domain: "", dept: "", title: "", startDate: "", endDate: "", summary: ""}],
      }
      if (this.workExperienceData.resumeId !== undefined) {
        sectionTemplate.resumeId = this.workExperienceData.resumeId;
        sectionTemplate.sectionName = this.workExperienceData.name;
        sectionTemplate.sectionContent =this.workExperienceData.content;
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
  methods: {
    addNewItem: function() {
      var oldData = this.formData.sectionContent;
      var newItem = oldData.slice(-1).map((item) => {
        item = '';
      });
      oldData.push(newItem);
    },
    deleteSelectedItem: function(index) {
      this.formData.sectionContent.splice(index, 1);
    },
  },
  components: {
    DatePicker,
  }
}
</script>

<style lang="sass" scoped>

</style>
