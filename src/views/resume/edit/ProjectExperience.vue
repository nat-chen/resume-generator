<template>
  <div class="project-experience">
    <v-btn flat icon @click="addNewItem">
      <v-icon>add</v-icon>
    </v-btn>
    <v-form
      ref="form" class="grey lighten-3 my-4 pa-2"
      v-model="isFormValid"
      v-for="(item, index) in sectionFormData.sectionContent"
      :key="index"
      lazy-validation
    >
      <v-text-field
        v-model="item.projectName"
        label="项目名称"
        required
      ></v-text-field>

      <v-text-field
        v-model="item.title"
        label="角色"
        required
      ></v-text-field>

      <v-layout row>
        <v-flex>
          <date-picker 
            v-model="item.startDate"
            labelName="开始时间"
            required
          ></date-picker>
        </v-flex>
        <v-flex>
          <date-picker 
            v-model="item.endDate"
            labelName="结束时间"
            required
          ></date-picker>
        </v-flex>
      </v-layout>
      <v-textarea
        v-model="item.summary"
        auto-grow
        name="projectIntroduction"
        label="项目介绍"
        rows="3"
      ></v-textarea>

      <v-textarea
        v-model="item.duty"
        auto-grow
        name="responsibility"
        label="个人职责"
        rows="3"
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
    projectExperienceData: {
      type: Object,
    }
  },
  data: function() {
    return {
      isFormValid: true,
      sectionFormData: {
        resumeId: '',
        sectionName: 'projectExperience',
        sectionContent: [{projectName: "", title: "", startDate: "", endDate: "", summary: "", duty: ""}],
      },
    }
  },
  watch: {
    projectExperienceData: {
      handler: function(newValue) {
        this.sectionFormData = Object.assign({}, this.sectionFormData, newValue);
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
    addNewItem: function() {
      var newItem = {projectName: "", title: "", startDate: "", endDate: "", summary: "", duty: ""};
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
