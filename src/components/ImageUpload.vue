<template>
  <div class="image-upload">
    <v-card
      class="mx-auto"
      max-width="150"
    >
    <v-card-title class="pa-2">
      <span class="title body-1">个人头像</span>
      <v-spacer></v-spacer>
      <v-btn small flat icon @click="enlargeAvatar">
        <v-icon small>zoom_in</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="pa-0" v-if="">
      <v-img :src="imageSrc" aspect-ratio="0.8" class="previewImage"></v-img>
    </v-card-text>

    <v-flex>
      <v-card-actions class="blue darken-3 text-xs-center" aspect-ratio="0.8" else>
      <v-icon class="white--text" large >cloud_upload</v-icon>
      <span class="white--text subheading">{{ hintText }}</span>
      <input type="file" 
        class="imageInput" 
        ref="imageInput"
        name="avatar"
        accept="image/png, image/jpeg, image/jpg"
        @change="uploadImage"
      >
    </v-flex>
   
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>


export default {
  name: 'imageUpload',
  data: function() {
    return {
      imageSrc: '',
      hintText: '点击/拖动上传',
    }
  },
  methods: {
    uploadImage: function() {
      var file = this.$refs.imageInput.files[0];
      var fileReader  = new FileReader();
      fileReader.onloadend = () => {
        this.imageSrc = fileReader.result; 
      }
      if (file) {
          fileReader.readAsDataURL(file); //包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
      } else {
          this.imageSrc = "";
      }
    }
  }

}
</script>
<style lang="scss" scoped>

.imageInput {
  display: none;
}

</style>

