<template>
  <v-dialog v-model="registerDialog" max-width="500px">
    <v-card>
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
            :append-icon="isShow ? 'visibility' : 'visibility_off'"
            :type="isShow ? 'text' : 'password'"
            :rules="passwordRules"
            hint="最少 8 位字符"
            label="密码"
            @click:append="isShow = !isShow"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createNewAccount">创建</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'register',
  data: function() {
    return {
      registerDialog: false,
      mobileNumber: '',
      password: '',
      isShow: false,
      isFormValid: false,
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
  created: function() {
    this.$eventBus.$on('registerDialog', () => {
      this.registerDialog = true;
    })
  },
  beforeDestroy: function() {
    this.$eventBus.$off('registerDialog');
  },
  methods: {
    createNewAccount: function() {
      if (this.$refs.form.validate() === false) {
        this.snackbarText = '请填写正确格式！'
        this.snackbar = true;
        return;
      };
      var data = {
        password: this.password,
        username: this.mobileNumber
      };
      this.$axios.post('register', data).then(response => {
        if (response.success === true) {
          const user = response.data.user;
          this.$router.push({ path: `/edit/${user.id}` });
          this.registerDialog = false;
        } else if (response.msg === '用户已存在') {
          this.snackbarText = '用户已存在！'
          this.snackbar = true;
        }
        
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
