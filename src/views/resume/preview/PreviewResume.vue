<template>
  <v-layout>
    <v-flex>
      <v-card color="blue-grey lighten-5" class='pa-1'>
        <v-layout justify-center align-center row>
          <v-layout justify-center>
            <v-avatar size="80">
              <img v-if="basicPersonalData.imgPath !== ''" :src="basicPersonalData.imgPath | imagePathFilter">
              <img v-else :src="defaultAvatar">
            </v-avatar>
          </v-layout>

          <v-flex>
            <v-card-title class='pb-0'>
              <div>
                <span class="title">{{ basicPersonalData.name }}</span>&nbsp;&nbsp;
                <v-icon v-if="basicPersonalData.sex === false" small>fa-venus</v-icon>
                <v-icon v-else small>fa-mars</v-icon>
                &nbsp;&nbsp;
                <span>{{ basicPersonalData.studentNo }}</span>
              </div>
            </v-card-title>
            <v-card-text>
              <div class='pb-1'>
                {{`
                  ${basicPersonalData.currentCompany} / 
                  ${basicPersonalData.currentTitle}
                `}}
              </div>
              <div class='pb-1'>
                {{`
                  ${basicPersonalData.yearsOfExperience} 年工作经验 / 
                  ${basicPersonalData.maxGrade} / 
                  ${basicPersonalData.age} 岁
                `}}
              </div>
              <div>
                <v-layout justify-start row>
                  <v-flex><span><v-icon small>phone</v-icon>&nbsp;{{ basicPersonalData.mobile }}</span></v-flex>
                  <v-flex><span><v-icon small>email</v-icon>&nbsp;{{ basicPersonalData.email }}</span></v-flex>
                </v-layout>
              </div>
            </v-card-text>
          </v-flex> 
        </v-layout>
      </v-card>

      <v-card>
        <v-card-title class="pb-0">
          <v-icon>outlined_flag</v-icon>&nbsp;
          <div class="subheading font-weight-bold">自我描述</div>
        </v-card-title>
        <v-card-text class="px-4">
          {{ selfDescription }}
        </v-card-text>
        <v-divider></v-divider>
      </v-card>

      <section-details 
        v-for="(list, index) in resumeSectionList"
        :key="index"
        :itemDetails="list"
      >
      </section-details>

    </v-flex>
  </v-layout>
</template>

<script>
import SectionDetails from './SectionDetails.vue';

export default {
  name: 'previewResume',
  data: function() {
    return {
      resumeData: {},
      basicPersonalData: {},
      workExperience: {},
      projectExperience: {},
      education: {},
      selfDescription: '',
    };
  },
  created: function() {
    var userId = this.$route.params.id;
    this.$axios.get(`/talent/resume/view/${userId}`).then(response => {
        if (response.success === true) {
          var sections = response.data.sections.map(function(item) {
            item.content = JSON.parse(item.content);
            return item;
          })
          this.resumeData = Object.assign({}, this.resumeData, response.data, { sections });
        }
      }).catch(error => {
        console.log(error)
      });
  },
  watch: {
    resumeData: {
      handler: function() {
        this.processBasicPersonalData();
        this.processSelfDescription();
        this.processWorkExperience();
        this.processProjectExperience();
        this.processEducation();
      }, 
      deep: true,
    }
  },
  computed: {
    resumeSectionList: function() {
      return [this.workExperience, this.projectExperience, this.education]
    },
    defaultAvatar: function() {
      var gender = this.basicPersonalData.sex === true ? 'male' : 'female';
      return `@/assets/${gender}.png`;
    }
  },
  methods: {
    processBasicPersonalData: function() {
      var data = this.resumeData;
      this.basicPersonalData = Object.assign({}, this.basicPersonalData, {
        name: data.resume.name,
        sex: data.resume.sex,
        mobile: data.resume.mobilePhone,
        email: data.sections[2].content.email,
        imgPath: data.resume.imgPath,
        studentNo: data.sections[2].content.studentNo,
        currentCompany: data.sections[1].content[0].companyName,
        currentTitle: data.sections[1].content[0].title,
        maxGrade: data.sections[4].content[0].maxGrade,
        age: new Date().getFullYear() - (data.sections[2].content.bornDate.split('-')[0]),
        yearsOfExperience: new Date().getFullYear() - (data.sections[2].content.startWorkDate.split('-')[0])
      });
    },
    processSelfDescription: function() {
      this.selfDescription = this.resumeData.sections[0].content.selfdesp;
    },
    processWorkExperience: function() {
      var data = this.resumeData.sections[1].content;
      this.workExperience = Object.assign({}, this.workExperience, {
        sectionTitle: '工作经历',
        itemList: data.map((item) => ({
          subTitle: [item.companyName, item.dept],
          content: [item.title],
          startDate: item.startDate,
          endDate: item.endDate,
          descriptionList: [item.summary],
        })),
      });
    },
    processProjectExperience: function() {
      var data = this.resumeData.sections[3].content;
      this.projectExperience = Object.assign({}, this.projectExperience, {
        sectionTitle: '项目经历',
        itemList: data.map((item) => ({
          subTitle: [item.projectName],
          content: [item.title],
          startDate: item.startDate,
          endDate: item.endDate,
          descriptionList: [item.summary, item.duty],
        })),
      });
    },
    processEducation: function() {
      var data = this.resumeData.sections[4].content[0];
      this.education = Object.assign({}, this.education, {
        sectionTitle: '教育经历',
        itemList: [{
          subTitle: [data.collegeName],
          content: [data.subject, data.maxGrade],
          startDate: data.startDate,
          endDate: data.endDate,
          descriptionList: [],
        }],
      })
    },
  },
  components: {
    SectionDetails,
  }
};
</script>

<style scoped>

</style>
