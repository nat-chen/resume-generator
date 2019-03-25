<template>
  <v-layout>
    <v-flex>
      <v-card class='pa-1'>
        <v-layout justify-center align-center row>
          <v-layout justify-center>
            <v-avatar size="80">
              <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            </v-avatar>
          </v-layout>

          <v-flex>
            <v-card-title class='pb-0'>
              <div>
                <span class="title">{{ basicPersonalData.name }}</span>&nbsp;&nbsp;
                <v-icon small>search</v-icon>&nbsp;&nbsp;
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
      resumeData: {
        resume: {
          id: "2c908087694bea8101699d18b9640055",
          userId: "2c908087694bea810169674ac3fd000f",
          name: "nat chen",
          sex: false,
          age: null,
          province: "",
          city: null,
          imgPath: "",
          mobilePhone: "18665949858",
          language: "zh-cn"
        },
        sections: [
          {
            id: "2c908087694bea8101699d18bbe40056",
            resumeId: "2c908087694bea8101699d18b9640055",
            name: "baseExtend",
            content:
              {"studentNo":"2019","bornDate":"2019-03","workCity":"深圳","email":"chen@outlook.com","startWorkDate":"2019-03"}
          },
          {
            id: "2c908087694bea8101699d18bbef0057",
            resumeId: "2c908087694bea8101699d18b9640055",
            name: "workExperience",
            content:
              [{"companyName":"A 公司","domain":"A 行业","dept":"A 部门","title":"A 职位","startDate":"2019-02","endDate":"2019-03","summary":"A 工作内容"},{"companyName":"B 公司","domain":"B 行业","dept":"B 部门","title":"B 职位","startDate":"2019-02","endDate":"2019-09","summary":"B 工作内容"}]
          },
          {
            id: "2c908087694bea8101699d18bbf60058",
            resumeId: "2c908087694bea8101699d18b9640055",
            name: "other",
            content: {"selfdesp":"A 自我描述","socialLink":"A 社交主页"}
          },
          {
            id: "2c908087694bea8101699d18bbf90059",
            resumeId: "2c908087694bea8101699d18b9640055",
            name: "education",
            content:
              [{"collegeName":"A 学校","startDate":2018,"endDate":2023,"subject":"A 专业","maxGrade":"大专"}]
          },
          {
            id: "2c908087694bea8101699d18bbfa005a",
            resumeId: "2c908087694bea8101699d18b9640055",
            name: "projectExperience",
            content:
              [{"projectName":"A 项目","title":"A 角色","startDate":"2019-02","endDate":"2019-03","summary":"A A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍A 项目介绍","duty":"个人职责"}]
          }
        ]
      },
    };
  },
  created: function() {
    var userId = this.$route.params.id;

    this.$axios.get('view').then(response => {
        if (response.success === true) {
          
        }
      }).catch(error => {
        console.log(error)
      });
  },
  computed: {
    basicPersonalData: function() {
      var data = this.resumeData;
      return {
        name: data.resume.name,
        sex: data.resume.sex === true ? 'female' : 'male',
        mobile: data.resume.mobilePhone,
        email: data.sections[0].content.email,
        imgPath: data.resume.imgPath,
        studentNo: data.sections[0].content.studentNo,
        currentCompany: data.sections[1].content[0].companyName,
        currentTitle: data.sections[1].content[0].title,
        maxGrade: data.sections[3].content[0].maxGrade,
        age: new Date().getFullYear() - (data.sections[0].content.bornDate.split('-')[0]),
        yearsOfExperience: new Date().getFullYear() - (data.sections[0].content.startWorkDate.split('-')[0])
      };
    },
    selfDescription: function() {
      return this.resumeData.sections[2].content.selfdesp;
    },
    workExperience: function() {
      var data = this.resumeData.sections[1].content;
      return {
        sectionTitle: '工作经历',
        itemList: data.map((item) => ({
          subTitle: [item.companyName, item.dept],
          content: [item.title],
          startDate: item.startDate,
          endDate: item.endDate,
          descriptionList: [item.summary],
        })),
      }
    },
    projectExperience: function() {
      var data = this.resumeData.sections[4].content;
      return {
        sectionTitle: '项目经历',
        itemList: data.map((item) => ({
          subTitle: [item.projectName],
          content: [item.title],
          startDate: item.startDate,
          endDate: item.endDate,
          descriptionList: [item.summary, item.duty],
        })),
      }
    },
    education: function() {
      var data = this.resumeData.sections[3].content[0];
      return {
        sectionTitle: '教育经历',
        itemList: [{
          subTitle: [data.collegeName],
          content: [data.subject, data.maxGrade],
          startDate: data.startDate,
          endDate: data.endDate,
          descriptionList: [],
        }],
      }
    },
    resumeSectionList: function() {
      return [this.workExperience, this.projectExperience, this.education]
    }
  },
  components: {
    SectionDetails,
  }
};
</script>

<style scoped>

</style>
