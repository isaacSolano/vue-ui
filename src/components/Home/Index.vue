<template>
  <v-row class="d-flex flex-row justify-center">
    <v-col class="d-flex flex-column align-center justify-center" cols="6">
      <h1 class="text-h1 pa-4">Welcome</h1>
      <h2 class="text-h3 pa-2">to myApp</h2>
    </v-col>

    <v-col class="d-flex flex-column align-center justify-center" cols="6">
      <v-btn to="/register_profile" color="primary" class="ma-2">
        Register Info
      </v-btn>

      <v-btn to="/login" color="secondary" class="ma-2">Sign in</v-btn>
    </v-col>
  </v-row>
</template>
