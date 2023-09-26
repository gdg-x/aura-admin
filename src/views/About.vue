<template>
  <v-main>
    <v-container class="mt-10">
      <v-row justify="center" align="center" class="">
        <v-col cols="12" md="11">
          <p class="google-font mb-1" style="font-size:60px;font-weight:600">Aura Admin - {{ $store.state.appVersion }}</p>
          <p class="google-font">
            Aura Admin is the Web App that helps you to mange the Tech
            Communities like GDGs, DSCs or any other tech communities.
          </p>
          <p>
            <v-btn
              color="primary"
              small
              href="https://github.com/gdg-x/aura-admin"
              class="ma-1 ml-0"
              target="_blank"
              rel="noreferrer"
              outlined
              depressed
              >Aura Admin Repo</v-btn
            ><v-btn
              color="primary"
              href="https://github.com/gdg-x/aura"
              class="ma-1 ml-0"
              small
              target="_blank"
              rel="noreferrer"
              outlined
              dark
              depressed
              >Aura Main Repo</v-btn
            ><v-btn
              color="primary"
              class="ma-1 ml-0"
              small
              href="https://docs.google.com/forms/d/e/1FAIpQLSc9hA2rbvGFB75DPjDuFVHwXJ8kf5ZgM_6gkMrUM-eKteYMPQ/viewform"
              target="_blank"
              rel="noreferrer"
              text
              >Add You Community in directry</v-btn
            >
          </p>
        </v-col>
        <v-col cols="12" md="11" >
          <h3 class="google-font">Maintainers</h3>
          <v-container fluid class="px-2">
            <v-row>
              <v-col
                cols="6"
                md="3"
                lg="2"
                class="pa-1"
                v-for="maintainer in maintainers"
                :key="maintainer.name"
              >
                <v-card
                  style="
                  user-select: none;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
                "
                  height="100%"
                  class="text-center elevation-0"
                >
                  <v-card-text style="height: 100%">
                    <v-avatar size="100">
                      <img
                        :src="
                          maintainer.photo.length > 0
                            ? maintainer.photo
                            : require('@/assets/img/default_avatar.jpg')
                        "
                        :alt="maintainer.name"
                      />
                    </v-avatar>
                    <p
                      class="mt-3 mb-0 google-font black--text"
                      style="font-size: 120%"
                    >
                      {{ maintainer.name }}
                    </p>
                    <p class="text-center ma-0 pa-0">
                      <SocialInfo :data="maintainer.links" />
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" md="11" v-if="contributors.length > 0">
          <h3 class="google-font">Contributors</h3>
          <v-container class="px-2">
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="4"
                class="pa-1"
                v-for="contributor in contributors"
                :key="contributor.name"
              >
                <v-list three-line subheader class="py-0">
                  <v-list-item class="">
                    <v-list-item-avatar>
                      <img
                        :src="
                          contributor.photo.length > 0
                            ? contributor.photo
                            : require('@/assets/img/default_avatar.jpg')
                        "
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        class="google-font mb-0"
                        v-text="contributor.name"
                      ></v-list-item-title>
                      <SocialInfo :data="contributor.links" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row> </v-container
  ></v-main>
</template>
<script>
import SocialInfo from "@/components/Common/SocialInfo";
export default {
  name: "about",
  components: {
    SocialInfo,
  },
  mounted() {
    this.fetchData();
  },
  data: () => ({
    maintainers: [],
    contributors: [],
    isLoading: false,
  }),
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const result = await fetch(
          "https://raw.githubusercontent.com/gdg-x/aura-admin/master/docs/data/app.json",
          {
            pragma: "no-cache",
            "cache-control": "no-cache",
          }
        );
        const parsedResult = await result.json();
        console.log(parsedResult);
        this.version = parsedResult.version
        this.maintainers = parsedResult.maintainers;
        this.contributors = parsedResult.contributors;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
