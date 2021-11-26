<template>
  <v-container fluid class="ma-0 pa-0">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular
          :width="5"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <p class="google-font mt-2">Getting Footer Settings</p>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0 px-1" v-else>
      <v-col md="12" cols="12" class="pa-0 my-0">
        <v-row class="py-0 my-0 mt-1">
          <v-col md="12" class="my-0 py-0">
            <v-toolbar
              class="elevation-0"
              style="border: 1px solid #e0e0e0; border-radius: 5px"
            >
              <v-toolbar-title class="google-font mr-3"
                >Manage Links
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                dark
                :loading="isAdding"
                @click="saveData"
                class="primary mx-2"
                depressed
                >Save Links</v-btn
              >
              <FooterLink @show="showSnakeBar" :data="this.linksData" />
            </v-toolbar>
            <p class="mb-0 mt-3 google-font" style="color: red">
              <b>Important! </b> Links will not be saved until and unless, if
              you will click the save button
            </p>
          </v-col>
        </v-row>
        <v-row class="my-0 py-0">
          <v-col md="12" v-if="linksData" class="my-0 py-0">
            <v-row class="my-0 py-0">
              <v-col md="3" cols="12" class="">
                <div
                  class="px-2 py-5"
                  style="
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    background: #fafafa;
                  "
                >
                  <p>About</p>
                  <NotFound
                    v-if="linksData.About && linksData.About.length <= 0"
                    text="No Links Found"
                  />
                  <v-row v-else v-for="(item, i) in linksData.About" :key="i">
                    <v-col class="my-0 py-1">
                      <v-toolbar
                        class="elevation-0"
                        style="border: 1px solid #e0e0e0; border-radius: 5px"
                      >
                        <v-toolbar-title class="google-font mr-3"
                          >{{ item.linkname }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <UpdateFooterLink :data.sync="item" />
                        <v-btn fab outlined x-small text>
                          <v-icon @click="deleteData(i, item.linktype)"
                            >mdi-delete</v-icon
                          >
                        </v-btn>
                      </v-toolbar>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col md="3" cols="12" class="">
                <div
                  class="px-2 py-5"
                  style="
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    background: #fafafa;
                  "
                >
                  <p>Resources</p>
                  <NotFound
                    v-if="
                      linksData.Resources && linksData.Resources.length <= 0
                    "
                    text="No Links Found"
                  />
                  <v-row
                    v-else
                    v-for="(item, i) in linksData.Resources"
                    :key="i"
                  >
                    <v-col class="my-0 py-1">
                      <v-toolbar
                        class="elevation-0"
                        style="border: 1px solid #e0e0e0; border-radius: 5px"
                      >
                        <v-toolbar-title class="google-font mr-3"
                          >{{ item.linkname ? item.linkname : "Not Found" }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <UpdateFooterLink :data.sync="item" />
                        <v-btn fab outlined x-small text>
                          <v-icon @click="deleteData(i, item.linktype)"
                            >mdi-delete</v-icon
                          >
                        </v-btn>
                      </v-toolbar>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col md="3" cols="12">
                <div
                  class="px-2 py-5"
                  style="
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    background: #fafafa;
                  "
                >
                  <p>Developer Cosnsole</p>
                  <NotFound
                    v-if="
                      linksData['Developer Console'] &&
                      linksData['Developer Console'].length <= 0
                    "
                    text="No Links Found"
                  />
                  <v-row
                    v-else
                    v-for="(item, i) in linksData['Developer Console']"
                    :key="i"
                  >
                    <v-col class="my-0 py-1">
                      <v-toolbar
                        class="elevation-0"
                        style="border: 1px solid #e0e0e0; border-radius: 5px"
                      >
                        <v-toolbar-title class="google-font mr-3"
                          >{{ item.linkname ? item.linkname : "Not Found" }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <UpdateFooterLink :data.sync="item" />
                        <v-btn fab outlined x-small text>
                          <v-icon @click="deleteData(i, item.linktype)"
                            >mdi-delete</v-icon
                          >
                        </v-btn>
                      </v-toolbar>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col md="3" cols="12">
                <div
                  class="px-2 py-5"
                  style="
                    border: 1px solid #e0e0e0;
                    border-radius: 5px;
                    background: #fafafa;
                  "
                >
                  <p>Footer End Session Link</p>
                  <NotFound
                    v-if="
                      linksData['Footer End Session Link'] &&
                      linksData['Footer End Session Link'].length <= 0
                    "
                    text="No Link Found"
                  />
                  <v-row
                    v-else
                    v-for="(item, i) in linksData['Footer End Session Link']"
                    :key="i"
                  >
                    <v-col class="my-0 py-1">
                      <v-toolbar
                        class="elevation-0"
                        style="border: 1px solid #e0e0e0; border-radius: 5px"
                      >
                        <v-toolbar-title class="google-font mr-3"
                          >{{ item.linkname ? item.linkname : "Not Found" }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <UpdateFooterLink :data.sync="item" />
                        <v-btn fab outlined x-small text>
                          <v-icon @click="deleteData(i, item.linktype)"
                            >mdi-delete</v-icon
                          >
                        </v-btn>
                      </v-toolbar>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from "@/config/firebase";
export default {
  name: "FooterConfig",
  components: {
    FooterLink: () => import("@/components/Config/Footer/AddFooterLink"),
    Snakebar: () => import("@/components/Common/Snakebar"),
    UpdateFooterLink: () => import("@/components/Config/Footer/EditFooterLink"),
    NotFound: () => import("@/components/Common/NotFound"),
  },
  data: () => ({
    tab: null,
    isLoading: false,
    isAdding: false,
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    linksData: {
      About: [],
      Resources: [],
      "Developer Console": [],
      "Footer End Session Link": [],
    },
  }),
  mounted() {
    this.getData();
  },
  methods: {
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
      this.getData();
    },
    deleteData(index, child) {
      this.linksData[child].splice(index, 1);
    },
    saveData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("footer")
        .set({ links: this.linksData })
        .then(() => {
          this.$emit("show", "Links Updated Success");
          this.isAdding = false;
        })
        .catch((e) => {
          this.$emit("show", e);
          this.isAdding = false;
          console.log(e);
        });
    },
    getData() {
      this.linksData = {
        About: [],
        Resources: [],
        "Developer Console": [],
        "Footer End Session Link": [],
      };
      this.isLoading = true;
      firebase.firestore
        .collection("config")
        .doc("footer")
        .get()
        .then((doc) => {
          if (!doc.exists) {
            this.isLoading = false;
            return;
          }
          doc = doc.data();
          if (Object.keys(doc).length > 0) {
            this.linksData = doc.links;
          }
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
  },
};
</script>