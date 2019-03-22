<template>
  <v-container fluid pa-0>
    <toolbar @save-resume-data="saveResumeData"></toolbar>

    <v-stepper vertical non-linear>
      <v-stepper-step step="1" editable>
        基本信息
      </v-stepper-step>
      <v-stepper-content step="1">
        <!-- <image-upload /> -->
        <basic-personal-info :basicInfoData="mergeBasicData" @save-form-data="saveFormData"/>
      </v-stepper-content>

      <v-stepper-step step="2" editable>
        工作经历
      </v-stepper-step>

      <v-stepper-content step="2">
        <work-experience  :workExperienceData="workExperienceData" @save-form-data="saveFormData"/>
      </v-stepper-content>

      <v-stepper-step step="3" editable>
        项目经历
      </v-stepper-step>

      <v-stepper-content step="3">
        <project-experience :projectExperienceData="projectExperienceData" @save-form-data="saveFormData"/>
      </v-stepper-content>

      <v-stepper-step step="4" editable>
        教育经历
      </v-stepper-step>
      <v-stepper-content step="4">
        <education :educationData="educationData" @save-form-data="saveFormData"/>
      </v-stepper-content>

      <v-stepper-step step="5" editable>
        其他
      </v-stepper-step>
      <v-stepper-content step="5">
         <others :othersData="otherData" @save-form-data="saveFormData"/>
      </v-stepper-content>
      
    </v-stepper>
  </v-container>
</template>

<script>
// import ImageUpload from './ImageUpload.vue';
import Toolbar from './Toolbar.vue';
import BasicPersonalInfo from './BasicPersonalInfo.vue';
import WorkExperience from './WorkExperience.vue';
import ProjectExperience from './ProjectExperience.vue';
import Education from './Education.vue';
import Others from './Others.vue';

  export default {
    data: function() {
      return {
        resumeData: null,
        basicInfoData: null,
        workExperienceData: null,
        projectExperienceData: null,
        educationData: null,
        otherData: null,
      }
    },
    computed: {
      dataList: function() {
        console.log('dataList', [this.resumeData, this.basicInfoData, this.workExperienceData, this.projectExperienceData, this.educationData, this.otherData])
        return [this.resumeData, this.basicInfoData, this.workExperienceData, this.projectExperienceData, this.educationData, this.otherData];
      },
      mergeBasicData: function() {
        return {
          resume: this.resumeData,
          section: this.basicInfoData,
        }
      }
    },
    created: function() {
      this.$axios.get('resume').then(response => {
        if (response.success === true) {
          let resposneData = response.data;
          this.resumeData = Object.assign({}, resposneData.resume);
          this.basicInfoData = Object.assign({}, resposneData.sections[0]);
          this.workExperienceData = Object.assign({}, resposneData.sections[2]);
          this.projectExperienceData = Object.assign({}, resposneData.sections[4]);
          this.educationData = Object.assign({}, resposneData.sections[1]);
          this.otherData = Object.assign({}, resposneData.sections[3]);
        }
      }).catch(error => {
        console.log(error)
      });
    },
    beforeDestroy: function() {

    },
    methods: {
      saveResumeData: function() {
        this.$nextTick(() => {
          this.$axios.post('resume', JSON.stringify(this.resumeData)).then(response => {
            if (response.success === true) {
              let resumeId = response.data.id;
              if (localStorage.getItem('resumeId') === null) {
                localStorage.setItem('resumeId', resumeId);
              }
              if (this.resumeData.id === null) {
                this.addResumeId(resumeId)
              }
              this.$nextTick(() => {
                this.dataList.slice(1).forEach(item => {
                console.log(JSON.parse(JSON.stringify(item)));
                this.$axios.post('section', item).then(response => {
                  if (response.success === true) {
                    console.log('section 响应成功')
                  }
                }).catch(error => {
                  console.log(error)
                });
              })
              })
              
            }
          }).catch(error => {
            console.log(error)
          });
        })
      },
      saveFormData: function(data) {
        console.log('data', data)
        if (data.resume !== undefined) {
          this.resumeData = data.resume;
          this.basicInfoData = data.section;
        } else {
          this[`${data.name}Data`] = data;
        }
      },
      addResumeId: function(id) {
        this.dataList.forEach(function(list, index) {
          if (index === 0) {
            list.id = id;
          } else {
            list.resumeId = id;
          }
        });
      }
    },
    components: {
      // ImageUpload,
      BasicPersonalInfo,
      WorkExperience,
      ProjectExperience,
      Education,
      Others,
      Toolbar,
    }
  }
</script>

<style>

</style>
