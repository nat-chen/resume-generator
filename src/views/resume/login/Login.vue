<template>
  <div>
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
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'login',
  data: function() {
    return {
      mobileNumber: '',
      password: '',
      isFormValid: false,
      isShowPassword: false,
      mobileRules: [
        value => !!value || '手机号为必填项',
        value => /^1[3-9][0-9]{9}$/.test(value) || '手机号码格式无效'
      ],
      passwordRules: [
        value => !!value || '密码为必填项',
        value => value.length >= 8 || '最少 8 位字符'
      ],
    }
  },
  methods: {
    loginResumeSystem: function() {
      if (this.$refs.form.validate() === false) {
        this.$eventBus.$emit('invalid-status-login', true, '请填写正确格式！');
        return;
      };
      const data = {
        username: this.mobileNumber,
        password: this.password
      }
      this.$eventBus.$emit('is-logging-snackbar', true);
      this.axiosRequest(data);
    },
    axiosRequest: function(data) {
      this.$axios.post('login', data).then(response => {
        if (response.success === true) {
          const user = response.data.user;
          localStorage.setItem(user.account, user.passwd);
          this.$router.push({ path: `/edit/${user.id}` });
        } else {
          this.$eventBus.$emit('invalid-status-login', true, '登陆失败, Bad credentials!');
        }
        this.$eventBus.$emit('is-logging-snackbar', false);
      }).catch(error => {
        this.$eventBus.$emit('invalid-status-login', true, '登陆失败');
      });
    },
    registerNewAccount: function() {
      this.$eventBus.$emit('show-register-dialog')
    },
  },
}
</script>

<style lang="sass" scoped>

</style>
