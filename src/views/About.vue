<template>
  <v-container style="width:95%">
    <v-row>
      <v-col cols="12">
        <h1 class="google-font">Aura Admin 3.1.1</h1>
        <p
          class="google-font"
        >Aura Admin is the Web App that helps you to mange the Tech Communities like GDGs, DSCs or any other tech communities.</p>
        <p><v-btn color="indigo" small href="https://github.com/gdg-x/aura-admin" class="ma-1 ml-0" target="_blank" rel="noreferrer" outlined depressed>Aura Admin Repo</v-btn><v-btn color="indigo" href="https://github.com/gdg-x/aura-admin" class="ma-1 ml-0" small target="_blank" rel="noreferrer" outlined dark depressed>Aura Main Repo</v-btn><v-btn color="indigo" class="ma-1 ml-0" small href="https://docs.google.com/forms/d/e/1FAIpQLSc9hA2rbvGFB75DPjDuFVHwXJ8kf5ZgM_6gkMrUM-eKteYMPQ/viewform" target="_blank" rel="noreferrer" text>Add You Community in directry</v-btn></p>
      </v-col>
      <v-col cols="12">
        <h3 class="google-font">Developers</h3>
        <v-container class="px-2">
          <v-row>
            <v-col cols="6" md="3" class="pa-1" v-for="developer in developes" :key="developer.name">
              <v-card
                style="user-select: none;border:1px solid #e0e0e0;border-radius:5px;"
                height="100%"
                class="text-center elevation-0"
              >
                <v-card-text style="height:100%">
                  <v-avatar size="100">
                    <img
                      :src="(developer.photo.length>0)?developer.photo:require('@/assets/img/default_avatar.jpg')"
                      alt
                    />
                  </v-avatar>
                  <p
                    class="mt-3 mb-0 google-font black--text"
                    style="font-size:120%"
                  >{{developer.name}}</p>
                  <p class="text-center ma-0 pa-0">
                    <SocialInfo :data="developer.links"/>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "about",
  components:{
    SocialInfo:()=>import('@/components/Common/SocialInfo.vue'),
  },
  data: () => ({
    developes: [
      {
        name: "Vrijraj Singh",
        photo:
          "https://unavatar.now.sh/twitter/VrijrajSingh",
        links: {
          github: "https://github.com/vrijraj/",
          linkedin: "https://www.linkedin.com/in/vrijraj/",
          twitter: "https://twitter.com/VrijrajSingh/"
        }
      },
      {
        name: "Bharat Agarwal",
        photo:
          "https://unavatar.now.sh/twitter/bharatagsrwal",
        links: {
          github: "https://github.com/bharatagsrwal/",
          linkedin: "https://www.linkedin.com/in/bharatagsrwal/",
          twitter: "https://twitter.com/bharatagsrwal/"
        }
      }
    ]
  })
};
</script>

<style>
</style>