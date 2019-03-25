<template>
  <v-card min-width="100%">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">登录简历管理系统</h3>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form
        ref="form"
        v-model="isFormValid"
        lazy-validation
      >
        <v-text-field
          v-model="mobileNumber"
          :rules="mobileRules"
          label="手机号"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
          :type="isShowPassword ? 'text' : 'password'"
          :rules="passwordRules"
          label="密码"
          @click:append="isShowPassword = !isShowPassword"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-layout row pb-1>
        <v-btn
          color="primary"
          @click="loginResumeSystem"
        >
          登录
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          color="theme--light"
          @click="registerNewAccount"
        >
          创建我的简历
        </v-btn>
      </v-layout>
    </v-card-actions>

    <snackbar :isSnackbarShow="isSnackbarShow" :snackbarText="snackbarText" @snackbar-display="snackbarDisplay"/>
  </v-card>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'login',
  data: function() {
    return {
      mobileNumber: '',
      password: '',
      isFormValid: false,
      isShowPassword: false,
      snackbarText: '',
      isSnackbarShow: false,
      mobileRules: [
        value => !!value || '手机号为必填项',
        value => /^1[3-9][0-9]{9}$/.test(value) || '手机号码格式无效'
      ],
      passwordRules: [
        value => !!value || '密码为必填项',
      ],
    }
  },
  methods: {
    loginResumeSystem: function() {
      if (this.$refs.form.validate() === false) {
        this.snackbarText = '请填写正确格式！'
        this.isSnackbarShow = true;
        return;
      };
      var data = {
        username: this.mobileNumber,
        password: this.password
      }
      this.$axios.post('login', data).then(response => {
        if (response.success === true) {
          const user = response.data.user;
          localStorage.setItem(user.account, user.passwd);
          this.$router.push({ path: `/edit/${user.id}` });
        } else {
          this.isSnackbarShow = true;
          console.log("here")
          this.snackbarText = '登陆失败, Bad credentials!'
          return;
        }
      }).catch(error => {
        console.log(error)
      });
    },
    registerNewAccount: function() {
      this.$eventBus.$emit('registerDialog')
    },
    snackbarDisplay: function() {
      this.isSnackbarShow = false;
    }
  },
  components: {
    Snackbar,
  }
}
</script>

<style lang="sass" scoped>

</style>
