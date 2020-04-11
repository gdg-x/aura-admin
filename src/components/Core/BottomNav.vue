<template>
    <v-bottom-navigation
        app
        grow
        v-model="bottomNav"
        color="indigo"
        class="hidden-md-and-up"
    >
        <v-btn to="/home">
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/events">
            <span>Events</span>
            <v-icon>mdi-assistant</v-icon>
        </v-btn>

        <v-btn to="/team">
            <span>Team</span>
            <v-icon>mdi-nature-people</v-icon>
        </v-btn>

        <v-btn to="/speakers">
            <span>Speakers</span>
            <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    data:()=>({
        name:'',
        bottomNav:''
    })
}
</script>