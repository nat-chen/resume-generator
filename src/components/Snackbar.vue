<template>
  <v-snackbar
    v-model="snackbar"
    color="red lighten-1"
    :timeout="timeout"
    top
  >
    {{ snackbarText }}
    <v-btn
      dark
      flat
      @click="snackbar = false"
      v-if="isButtonShow"
    >
      关闭
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    snackbarText: {
      type: String,
      default: '请填写正确格式！'
    },
    timeout: {
      type: Number,
      default: 2000,
    },
    color: {
      type: String,
      default: 'red lighten-1',
    },
    isButtonShow: {
      type: Boolean,
      default: true,
    },
    isSnackbarShow: {
      type: Boolean,
    }
  },
  data: function() {
    return {
      snackbar: this.isSnackbarShow,
    }
  },
  watch: {
    snackbar: function(value) {
      console.log(1);
      if (value === false) {
        console.log(2);
        this.$emit('snackbar-display', false);
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
