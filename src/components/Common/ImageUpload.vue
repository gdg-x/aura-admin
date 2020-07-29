<template>
  <v-dialog v-model="imageDialog" v-if="userId.length>0" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary"  depressed :loading="imageUploading" dark class="mt-2" v-on="on">{{buttonName || "or Upload"}} </v-btn>
    </template>
    <v-card>
      <v-card-title class="google-font">Upload {{userId}}'s Image</v-card-title>
      <v-card-text>
        <v-img :src="imagePre" class="mb-6"></v-img>

        <v-file-input
          v-model="imageUpload"
          accept="image/*"
          label="Select Image"
          prepend-icon="mdi-image"
          show-size
          @change="onFileChange"
          outlined
        ></v-file-input>
        <p class="google-font my-0" style="color:red">*Image should be in jpeg/jpg/png/webp/ico only</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="imageDialog = false">Discard</v-btn>
        <v-btn color="green darken-1" text @click="uploadImage" :loading="imageUploading">Upload Image</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/config/firebase";

export default {
  name: "imageupload",
  props: ["type", "userId", "buttonName"],
  data: () => ({
    imageDialog: false,
    imageUploading: false,
    imagePre: "",
    imageUpload: []
  }),
  methods: {
    onFileChange() {
      this.imagePre = "";
      if (!this.imageUpload || this.imageUpload == undefined) return;
      let reader = new FileReader();
      reader.readAsDataURL(this.imageUpload);
      reader.onload = () => {
        this.imagePre = reader.result;
      };
    },
    uploadImage() {
      if (!this.userId || this.userId.length < 1) {
        this.$emit("message", "Id is Empty");
        this.imageUploading = false;
        this.imageDialog = false;
        return;
      }
      this.imageUploading = true;
      let ext = this.imageUpload.name.split(".").pop();

      // Checking if Extension us 
      if(ext != 'jpeg' && ext != 'jpg' && ext != 'png' && ext != "webp" && ext != 'JFIF' && ext != 'ico'){
        this.$emit("message", "Please choose image format in jpeg/jpg/png/webp/JFIF/ico");
        this.imageUploading = false;
        return;
      }
      let url = `${this.type}/${this.userId}.${ext}`;
      var refLink = firebase.storage.ref(url);
      refLink
        .put(this.imageUpload)
        .then(file => {
          refLink.getDownloadURL().then(a => {
            this.$emit("message", "Image Uploaded kindly Save the Data");
            this.$emit("uploadedImage", a);
            this.imageUploading = false;
            this.imageDialog = false;
          }).catch(e=>{
            this.imageUploading = false;
            this.$emit("message", e);
          });
        })
        .catch(e => {
          this.imageUploading = false;
          this.$emit("emptyUserId", e);
        });

      //   console.log(url);
    }
  }
};
</script>

<style>
</style>