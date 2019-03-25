<template>
  <v-container fluid pa-0>
    <toolbar @save-resume-data="saveResumeData"></toolbar>
    <v-stepper vertical non-linear>
      <v-stepper-step step="1" editable>
        基本信息
      </v-stepper-step>
      <v-stepper-content step="1">
        <image-upload @uploaded-image="uploadedImage" :imgPath="imgPath" />
        <basic-personal-info :mergeBasicData="mergeBasicData" @save-form-data="saveFormData"/>
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
         <others :otherData="otherData" @save-form-data="saveFormData"/>
      </v-stepper-content>
      
    </v-stepper>
    <snackbar :isSnackbarShow="isSnackbarShow" :snackbarText="snackbarText" @snackbar-display="snackbarDisplay"/>
  </v-container>
</template>

<script>
import ImageUpload from '@/components/ImageUpload.vue';
import Snackbar from '@/components/Snackbar.vue';
import Toolbar from './Toolbar.vue';
import BasicPersonalInfo from './BasicPersonalInfo.vue';
import WorkExperience from './WorkExperience.vue';
import ProjectExperience from './ProjectExperience.vue';
import Education from './Education.vue';
import Others from './Others.vue';

  export default {
    data: function() {
      return {
        basicData: {},
        baseExtendData: {}, 
        workExperienceData: {},
        projectExperienceData: {},
        educationData: {},
        otherData: {},
        isSnackbarShow: false,
        snackbarText: '登录状态过期，请重新登录！',
        imgPath: '',
      }
    },
    computed: {
      dataList: function() {
        return [this.basicData, this.baseExtendData, this.educationData, this.workExperienceData, this.projectExperienceData, this.otherData];
      },
      mergeBasicData: function() {
        return {
          resume: this.basicData,
          section: this.baseExtendData,
        }
      }
    },
    created: function() {
      this.$axios.get('resume').then(response => {
        if (response.success === true) {
          this.processResponseData(response.data);
        }
      }).catch(error => {
        this.isSnackbarShow = true;
      });
    },
    beforeDestroy: function() {

    },
    methods: {
      uploadedImage: function(path) {
        this.$set(this.basicData, 'imgPath', path);
      },
      saveResumeData: function() {
          this.$axios.post('resume', this.basicData).then(response => {
            if (response.success === true) {
              let resumeId = response.data.id;
              this.addResumeId(resumeId);
              this.dataList.slice(1).forEach(item => {
                var data = Object.assign({}, item, {
                  sectionContent: JSON.stringify(item.sectionContent),
                });
                this.$axios.post('section', data).then(response => {
                  if (response.success === true) {
                    console.log('section 响应成功');
                  }
                }).catch(error => {
                  this.snackbarText = '保存失败，请刷新重试！'
                  this.isSnackbarShow = true;
                });
              })
            }
          }).catch(error => {
            console.log(error)
          });
      },
      saveFormData: function(data) {
        if (data.resume !== undefined) {
          this.basicData = data.resume;
          this.baseExtendData = data.section;
        } else {
          this[`${data.sectionName}Data`] = data;
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
      },
      processResponseData: function(data) {
        if (data.resume !== null) {
          this.basicData = Object.assign({}, this.basicData, data.resume);
          this.imgPath = this.basicData.imgPath;
          data.sections.forEach((item) => {
            var dataName = `${item.name}Data`;
            this[dataName] = Object.assign({}, this[dataName], {
                resumeId: item.resumeId,
                sectionContent: JSON.parse(item.content),
                sectionName: item.name,
              });
          })
        }
      },
      snackbarDisplay: function() {
        this.isSnackbarShow = false;
      }
    },
    components: {
      ImageUpload,
      BasicPersonalInfo,
      WorkExperience,
      ProjectExperience,
      Education,
      Others,
      Toolbar,
      Snackbar,
    }
  }
</script>

<style>

</style>
