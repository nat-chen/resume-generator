<template>
  <div class="education">
    <v-btn flat icon @click="addNewItem">
      <v-icon>add</v-icon>
    </v-btn>
    <v-form class="grey lighten-3 my-4 pa-2"
      ref="form"
      v-for="(item, index) in sectionFormData.sectionContent"
      :key="index"
      v-model="isFormValid"
      lazy-validation
    >
      <v-text-field
        v-model="item.collegeName"
        label="学校名称"
        required
      ></v-text-field>

      <v-layout row>
        <v-select
          v-model="item.startDate"
          :items="startTimeList"
          label="开始时间"
        ></v-select>
        <v-select
          v-model="item.endDate"
          :items="endTimeList"
          label="结束时间"
        ></v-select>
      </v-layout>

      <v-text-field
        v-model="item.subject"
        label="专业"
        required
      ></v-text-field>

      <v-select
        v-model="item.maxGrade"
        :items="degreeList"
        label="学历"
      ></v-select>

      <v-btn flat icon @click="deleteSelectedItem(index)">
        <v-icon color="red">delete</v-icon>
      </v-btn>

    </v-form>
  </div>  
</template>

<script>
export default {
  props: {
    educationData: {
      type: Object,
    }
  },
  data: function() {
    return {
      isFormValid: true,
      sectionFormData: {
        resumeId: '',
        sectionName: 'education',
        sectionContent: [{collegeName: "", startDate: "", endDate: "", subject: "", maxGrade: ""}],
      },
    }
  },
  watch: {
    educationData: {
      handler: function(newValue) {
        this.sectionFormData = Object.assign({}, this.sectionFormData, newValue);
      },
      deep: true,
    }
  },
  computed: {
    startTimeList: function() {
      return Array.from({length: 69}, function(item, index) { 
        
        let currentYear = new Date().getFullYear();
        return currentYear - index;
      });
    },
    endTimeList: function() {
      return Array.from({length: 74}, function(item, index) {
        return 2024 - index;
      });
    },
    degreeList: function() {
      return ['大专', '本科', '硕士', '博士', '其他'];
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
      var newItem = {collegeName: "", startDate: "", endDate: "", subject: "", maxGrade: ""};
      this.sectionFormData.sectionContent.push(newItem);
    },
    deleteSelectedItem: function(index) {
      this.sectionFormData.sectionContent.splice(index, 1);
    },

  },
}
</script>

<style lang="sass" scoped>

</style>
