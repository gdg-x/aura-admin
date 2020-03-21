<template>
    <v-container>
        <h1>Config</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugiat aut, sunt dolorem quas earum dicta eum unde nemo assumenda nostrum ex quos. Sed corporis aut repellat quibusdam animi ut.</p>

        <v-tabs v-model="tab" show-arrows background-color="grey lighten-3" >
            <v-tab key="item1">General</v-tab>
            <v-tab key="item2">Community Guidelines</v-tab>
            <v-tab key="item3">Footer Config</v-tab>
            <v-tab key="item4">Partners</v-tab>
            <v-tab key="item5">Keys & Securities</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" style="border:1px solid #e0e0e0;border-radius:5px;">
            <v-tab-item key="item1">
                <v-card flat>
                    <v-card-text>
                        <General/>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="item2">
                <v-card flat>
                    <v-card-text>
                        <p>Item 2</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores illo blanditiis iste atque accusamus expedita? Veniam, cum! Quia magnam quisquam aliquid, illo totam incidunt! Ea, fuga error? Numquam, nostrum ut.</p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="item3">
                <v-card flat>
                    <v-card-text>
                        <p>Item 3</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores illo blanditiis iste atque accusamus expedita? Veniam, cum! Quia magnam quisquam aliquid, illo totam incidunt! Ea, fuga error? Numquam, nostrum ut.</p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="item4">
                <v-card flat>
                    <v-card-text>
                        <p>Item 4</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores illo blanditiis iste atque accusamus expedita? Veniam, cum! Quia magnam quisquam aliquid, illo totam incidunt! Ea, fuga error? Numquam, nostrum ut.</p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item key="item5">
                <v-card flat>
                    <v-card-text>
                        <p>Item 5</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores illo blanditiis iste atque accusamus expedita? Veniam, cum! Quia magnam quisquam aliquid, illo totam incidunt! Ea, fuga error? Numquam, nostrum ut.</p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import General from '@/components/Config/General/General'
export default {
  name: "Config",
  components:{
    General
  },
  data: () => ({
    tab:null
  }),
  mounted() {
   
  },
  methods: {
    
  }
};
</script>
