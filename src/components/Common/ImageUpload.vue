<template>
  <v-dialog v-model="imageDialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" :loading="imageUploading" dark class="mt-2" v-on="on">OR Upload</v-btn>
    </template>
    <v-card>
      <v-card-title>Upload {{userId}}'s Image</v-card-title>
      <v-card-text>
        <v-img :src="imagePre" class="mb-6"></v-img>

        <v-file-input
          v-model="imageUpload"
          accept="image/*"
          label="Select Image"
          show-size
          prepend-icon
          @change="onFileChange"
          outlined
        ></v-file-input>
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
  props: ["type", "userId"],
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
        this.$emit("message", "UserId is Empty");
        this.imageDialog = false;
        return;
      }
      this.imageUploading = true;
      let url = `${this.type}/${this.userId}.${this.imageUpload.name.split(".").pop()}`;
      var refLink = firebase.storage.ref(url);
      refLink
        .put(this.imageUpload)
        .then(file => {
          refLink.getDownloadURL().then(a => {
            this.$emit("message", "Image Uploaded");
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