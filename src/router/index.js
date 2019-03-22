import Vue from 'vue';
import Router from 'vue-router';
import LoginResume from '../views/resume/login/LoginResume';
import EditResume from '../views/resume/edit/EditResume';
import PreviewResume from '../views/resume/preview/PreviewResume'

Vue.use(Router)

export default new Router({
  routes: [
    { // 登录
      name: 'loginResume',
      path: '/',
      component: LoginResume,
    },
    { // 编辑简历
      name: 'editResume',
      path: '/edit/:id',
      component: EditResume,
    },
    { // 预览简历
      name: 'previewResume',
      path: '/preview/:id',
      component: PreviewResume,
    },
  ]
})
