<template>
  <div class="education">
    <v-btn flat icon @click="addNewItem">
      <v-icon>add</v-icon>
    </v-btn>
    <v-form class="grey lighten-3 my-4 pa-2"
      ref="form"
      v-for="(item, index) in formData.content"
      :key="index"
      v-model="isFormValid"
      lazy-validation
    >
      <v-text-field
        v-model="item.collegeName"
        :rules="schoolNameRules"
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
        :rules="majorRules"
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
      schoolNameRules: [
        value => !!value || '学校名称为必填项',
      ],
      startTimeRules: [
        value => !!value || '开始时间为必选项',
      ],
      endTimeRules: [
        value => !!value || '结束时间为必选项',
      ],
      majorRules: [
        value => !!value || '专业为必填项',
      ],
      degreeRules: [
        value => !!value || '学历为必选项',
      ],
    }
  },
  computed: {
    formData: function() {
      if (this.educationData === null) {
        return {
            id: "",
            resumeId: "",
            name: "education",
            content: [{collegeName: "", startDate: "", endDate: "", subject: "", maxGrade: ""}]
        }
      } else {
        return this.educationData;
      }
    },
    startTimeList: function() {
      return Array.from({length: 69}, function(item, index) {
        return 2019 - index;
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
    this.$eventBus.$on('save-form', () => {
      this.$emit('save-form-data', this.formData);
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off('save-form');
  },
  methods: {
    addNewItem: function() {
      var oldData = this.formData.content;
      var newItem = oldData.slice(-1).map((item) => {
        item = '';
      });
      oldData.push(newItem);
    },
    deleteSelectedItem: function(index) {
      this.formData.content.splice(index, 1);
    },

  },
}
</script>

<style lang="sass" scoped>

</style>
