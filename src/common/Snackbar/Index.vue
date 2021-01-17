<template>
  <v-snackbar v-model="isSnackbarOpen" :color="snackbarColor">
    {{ snackbarText }}

    <template v-slot:action="{ attrs }">
      <v-btn fab small text v-bind="attrs" @click="closeSnackbar()">
        <v-icon dark>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

@Component({})
export default class Snackbar extends Vue {
  @Prop() snackbarText: string;
  @Prop() snackbarColor: string;
  @Prop() isSnackbarOpen: boolean;
  @Emit("closeSnackbar") closeSnackbar() {
    return false;
  }

  constructor() {
    super();

    this.snackbarText = "";
    this.snackbarColor = "";

    this.isSnackbarOpen = false;
  }
}
</script>
