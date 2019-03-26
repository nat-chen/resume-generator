<template>
  <div class="work-experience">
    <v-btn flat icon @click="addNewItem">
      <v-icon>add</v-icon>
    </v-btn>

    <v-form class="grey lighten-3 my-4 pa-2" 
      v-for="(item, index) in sectionFormData.sectionContent" :key="index"
      ref="form"
      v-model="isFormValid"
      lazy-validation
    >
      <v-text-field
        v-model="item.companyName"
        label="公司名称"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.domain"
        label="行业"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.dept"
        label="部门"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.title"
        label="职位"
        required
      ></v-text-field>
      <v-layout row>
        <v-flex>
          <date-picker
            v-model="item.startDate"
            labelName="开始时间"
            required>
          ></date-picker>
        </v-flex>
        <v-flex>
          <date-picker
            v-model="item.endDate" 
            labelName="结束时间"
            required>
          ></date-picker>
        </v-flex>
      </v-layout>
      <v-textarea
        auto-grow
        v-model="item.summary"
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
      isFormValid: true,
      sectionFormData: {
        resumeId: '',
        sectionName: 'workExperience',
        sectionContent: [{companyName: "", domain: "", dept: "", title: "", startDate: "", endDate: "", summary: ""}],
      },
    }
  },
  watch: {
    workExperienceData: {
      handler: function(newValue) {
        this.sectionFormData = Object.assign({}, this.sectionFormData, newValue);
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
    addNewItem: function() {
      var newItem = {companyName: "", domain: "", dept: "", title: "", startDate: "", endDate: "", summary: ""};
      this.sectionFormData.sectionContent.push(newItem);
    },
    deleteSelectedItem: function(index) {
      this.sectionFormData.sectionContent.splice(index, 1);
    },
  },
  components: {
    DatePicker,
  }
}
</script>

<style lang="sass" scoped>

</style>
