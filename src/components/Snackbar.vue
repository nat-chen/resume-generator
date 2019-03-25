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
      default: false,
    }
  },
  data: function() {
    return {
      snackbar: this.isSnackbarShow,
    }
  },
  watch: {
    snackbar: function(value) {
      if (value === false) {
        this.$emit('snackbar-display', false);
      }
    },
    isSnackbarShow: function(value) {
      this.snackbar = value;
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
