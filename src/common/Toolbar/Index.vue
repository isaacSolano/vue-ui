<template>
  <v-toolbar dense>
    <v-container>
      <v-row class="d-flex flex-row justify-space-between">
        <v-col
          class="d-flex flex-row justify-space-between align-center"
          cols="2"
        >
          <v-icon color="primary" :dense="true" :large="true">
            mdi-account-circle
          </v-icon>
          <v-toolbar-title>{{ firstName }} {{ lastName }}</v-toolbar-title>
        </v-col>

        <v-col class="d-flex flex-row justify-end" cols="4">
          <v-btn color="error">Logout</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { errorColor } from "../variables";

@Component({})
export default class Toolbar extends Vue {
  @Prop() firstName: string;
  @Prop() lastName: string;

  logoutColor = errorColor;

  constructor() {
    super();

    this.firstName = "";
    this.lastName = "";
  }
}
</script>
