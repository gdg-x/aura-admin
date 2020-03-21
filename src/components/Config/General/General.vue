<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
            <v-col md="4" cols="12">
                <v-row>
                    <v-col>
                        <div class="pa-4" style="border:1px solid #e0e0e0;border-radius:5px;background:#fafafa">
                            <p class="google-font my-0 py-0 mb-2" >Community Info</p>
                            <v-text-field
                                class="my-0 py-0"
                                label="Community Name"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                class="my-0 py-0"
                                label="Community Website Link"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                class="my-0 py-0"
                                label="Community Meetup Link"
                                outlined
                            ></v-text-field>
                        </div>
                        <div class="pa-4 mt-5" style="border:1px solid #e0e0e0;border-radius:5px;background:#fafafa">
                            <p class="google-font my-0 py-0 mb-2" >Blogs</p>
                            <v-text-field
                                class="my-0 py-0"
                                label="Medium Blog"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                class="my-0 py-0"
                                label="Dev.to Blog"
                                outlined
                            ></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col md="8" cols="12" >
                <v-row class="my-0 py-0">
                    <v-col class="mb-0 pb-0" cols="12">
                        <v-textarea
                            outlined
                            name="input-7-4"
                            label="Community Short Description"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                            class="mb-0 pb-0"
                        ></v-textarea>
                    </v-col>
                    <v-col class="mb-0 pb-0" cols="12">
                        <v-textarea
                            outlined
                            name="input-7-4"
                            label="Community Long Description"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                            class="mb-0 pb-0"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <!-- Socail Links -->
                <v-row class="my-0 py-0">
                    <v-col md="12" class="my-0 py-0">
                        <p>Social Links</p>
                    </v-col>
                    <v-col class="my-0 py-0" cols="12">
                        <v-row class="my-0 py-0">
                            <v-col class="my-0 py-0" md="4" cols="12">
                                <v-text-field
                                    class="my-0 py-0"
                                    label="Linkedin"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col class="my-0 py-0" md="4" cols="12">
                                <v-text-field
                                    class="my-0 py-0"
                                    label="Twitter"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col class="my-0 py-0" md="4" cols="12">
                                <v-text-field
                                    class="my-0 py-0"
                                    label="Github"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="my-0 py-0">
                            <v-col class="my-0 py-0" md="4" cols="12">
                                <v-text-field
                                    class="my-0 py-0"
                                    label="Instagram"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col class="my-0 py-0" md="4" cols="12">
                                <v-text-field
                                    class="my-0 py-0"
                                    label="Facebook"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col class="my-0 py-0" md="4" cols="12">
                                <v-text-field
                                    class="my-0 py-0"
                                    label="Medium"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        
                    </v-col>
                </v-row>
                <!-- Socail Links -->

                <!-- Hashtag -->
                <v-row class="my-0 py-0">
                    <v-col md="12" class="my-0 py-0" cols="12">
                        <p>HashTags</p>
                    </v-col>
                    <v-col class="my-0 py-0" cols="12">
                        <v-combobox
                            v-model="chips"
                            :items="hashtag"
                            chips
                            clearable
                            label="Community Hashtags"
                            multiple
                            outlined
                        >
                            <template v-slot:selection="{ attrs, item, select, selected }">
                            <v-chip
                                v-bind="attrs"
                                :input-value="selected"
                                close
                                @click="select"
                                @click:close="remove(item)"
                            >
                                <strong class="google-font">{{ item }}</strong>
                            </v-chip>
                            </template>
                        </v-combobox>
                    </v-col>
                </v-row>
                <!-- Hashtag -->
            </v-col>

            <v-col>
                <v-btn depressed color="indigo" dark>Save General Settings</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  name: "Config",
  data: () => ({
    tab:null,
    chips:[],
    hashtag: []
  }),
  mounted() {
   
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
    },
  }
};
</script>