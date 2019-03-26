<template>
  <div class="image-upload">
    <v-card
      class="mx-auto"
      max-width="150"
    >
      <v-card-title class="pa-2">
        <span class="subtitle-1">个人头像</span>
        <v-spacer></v-spacer>
        <v-btn class="pa-0 ma-0" small flat icon @click="enlargeAvatar">
          <v-icon>zoom_in</v-icon>
        </v-btn>
      </v-card-title>
      <div ref="dropArea">
        <v-hover>
        <v-card
          slot-scope="{ hover }"
          class="mx-auto"
          color="grey lighten-4"
        >
          <v-img
            :aspect-ratio="0.9"
            :src="imageSrc | imagePathFilter"
          >
          <input type="file" ref="imageInput" accept="image/*" style="display: none;" @change="upload"/>
            <v-expand-transition>
              <div
                v-if="hover"
                class="transition-fast-in-fast-out primary v-card--reveal title white--text"
                style="height: 100%;"
                @click="uploadImageListener"
              >
                <p>{{ progressStatus }}</p>
                <v-icon large color="white">fa-arrow-circle-up</v-icon>
                <br>
                <p>点击/拖动上传</p>
              </div>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-hover>
      </div>
    </v-card>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="card-position">
        <v-img :src="imageSrc | imagePathFilter" aspect-ratio="1.7"></v-img>
        <v-btn fab color="primary button-position" @click="closeImage"><v-icon>close</v-icon></v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    imgPath: {
      type: String,
      default: '',
    }
  },
  name: 'imageUpload',
  data: function() {
    return {
      imageSrc: '',
      hintText: '点击/拖动上传',
      dialog: false,
      progressStatus: '',
    }
  },
  watch: {
    imgPath: function() {
      this.imageSrc = this.imgPath
    }
  },
  mounted: function() {
    this.dropAndDropImage();
  },
  methods: {
    upload: function(event, file) {
      var file = file || this.$refs.imageInput.files[0];
      var validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file && file.type)) {
        this.$eventBus.$emit('invalid-staus-edit', true, '上传文件仅限图片，请重新选择！');
        return;
      }

      var fileReader  = new FileReader();
      const formData = new FormData();
      fileReader.onloadend = () => {
        formData.append('file_' + Date.now(), file);
        axios.post('/base/file/upload', formData).then(res => {
          var path = res.data[0].path;
          this.imageSrc = path;
          this.$emit('image-updated', path);
        }).catch(err => console.log(err));
      };
      fileReader.onprogress = (event) => {
        if (event.lengthComputable) {
          this.progressStatus = `${(event.loaded / event.total) * 100}%`
          if (this.progressStatus === '100%') {
            setTimeout(() => {
              this.progressStatus = '';
            }, 1000);
          }
        }
    };
      if (file) {
        fileReader.readAsDataURL(file); //包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
      } else {
        this.imageSrc = "";
      }
    },
    uploadImageListener: function() {
      this.$refs.imageInput.click();
    },
    enlargeAvatar: function(){
      this.dialog = true;
    },
    closeImage: function() {
      this.dialog = false;
    },
    dropAndDropImage: function() {
      var dropArea = this.$refs.dropArea;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.preventDefaults, false)   
        document.body.addEventListener(eventName, this.preventDefaults, false)
      });
      dropArea.addEventListener('drop', this.handleDrop, false)
    },
    preventDefaults: function(event) {
      event.preventDefault()
      event.stopPropagation()
    },
    handleDrop: function(event) {
      var dt = event.dataTransfer
      var files = dt.files;
      this.upload(event, files[0]);
    },
    handleFiles: function(files) {
      files = [...files]
      files.forEach(this.upload);
    },
  }
}
</script>
<style lang="scss" scoped>

.imageInput {
  display: none;
}

.v-card--reveal {
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  // position: absolute;
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.button-position {
  position: absolute;
  bottom: 30%;
  left: 43%
}
</style>

