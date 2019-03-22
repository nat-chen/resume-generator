<template>
  <v-menu
    ref="datePicker"
    v-model="datePicker"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="200px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="labelName"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker 
      v-model="date" 
      :type="datePickerType" 
      locale="zh-cn" 
      no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="savePickedDate">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    datePickerType: {
      type: String,
      default: 'month',
      validator: function(value) {
        return ['month', 'date'].indexOf(value) !== -1;
      },
    },
    labelName: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
      date: null,
      datePicker: false,
    }
  },
  methods: {
    savePickedDate: function() {
      this.$refs.datePicker.save(this.date);
      this.$emit('input', this.date);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

