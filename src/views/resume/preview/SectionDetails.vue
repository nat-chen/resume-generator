<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-icon>outlined_flag</v-icon>&nbsp;
      <div class="subheading font-weight-bold">{{ itemDetails.sectionTitle }}</div>
    </v-card-title>
    <v-card flat class="px-1"
        v-for="(item, index) in itemDetails.itemList"
        :key=index
      >
      <v-card-text class="card">
        <div class="pb-1">
          <span class="font-weight-bold">
            {{ item.subTitle[0] }}
          </span> 
          <template v-if="item.subTitle.length === 2">
            / {{ item.subTitle[1]}}
          </template>
        </div>
        <div class="pb-3">
          {{ item.content.length === 2 ? `${item.content[0]} / ${item.content[1]}` : `${item.content[0]}`}}
        </div>
        <div 
          v-for="(list, index) in item.descriptionList"
          :key="index"
        >
          {{ list }}
        </div>
        <span class='work-period'>
          {{ item.startDate}} - {{ item.endDate }}
        </span>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    itemDetails: {
      type: Object,
    }
  },
  created: function() {
    console.log(this.itemDetails);
  }
}
</script>

<style scoped>
  .work-period {
    position: absolute;
    top: 12px;
    right: 18px;
  }
</style>
