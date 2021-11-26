<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            icon
            v-on="on"
            dark
            color="primary"
            class="mx-1"
            outlined
            @click.stop="dialog = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove {{ EventInfo.name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font"
        >Would you like to remove {{ EventInfo.name }} form the
        Events?</v-card-text
      >
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false"
          >Disagree</v-btn
        >

        <v-btn
          color="red darken-1"
          text
          :loading="loading"
          @click="deleteItem(EventInfo.id)"
          >Agree</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomEventServices from "@/services/CustomEventServices";
export default {
  name:"DeleteCustomEvent",
  props: {
    EventInfo: {},
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    deleteItem(id) {
      this.loading = true;
      CustomEventServices.removeCustomEvent(this.EventInfo.id)
        .then((res) => {
          if (res.success == true) {
            this.loading = false;
            this.dialog = false;
            this.$router.push({
              path: "/events",
              query: { msg: res.msg },
            });
          }
        })
        .catch((e) => {
          this.isLoading = false;
        });

      // firebase.firestore
      //   .collection("events")
      //   .doc(this.EventInfo.id)
      //   .delete()
      //   .then(() => {
      //     this.loading = false;
      //     this.dialog = false;
      //   //   this.$emit("RemoveSuceess");
      //     this.$router.push({
      //       path: "/events",
      //       query: { msg: "removesuccess" }
      //     });
      //   })
      //   .catch(e => {
      //     console.log(e);
      //     this.isLoading = false;
      //   });
    },
  },
};
</script>
