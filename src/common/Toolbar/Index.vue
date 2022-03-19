<template>
  <v-toolbar dense>
    <v-container>
      <v-row class="d-flex flex-row justify-space-between">
        <v-col class="d-flex flex-row justify-start align-center" cols="4">
          <v-icon color="primary" :dense="true" :large="true">
            mdi-account-circle
          </v-icon>
          <v-toolbar-title class="px-2">
            {{ firstName }} {{ lastName }}
          </v-toolbar-title>
        </v-col>

        <v-col class="d-flex flex-row justify-end" cols="4">
          <v-btn color="error" @click="closeSession()">Logout</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

// Common
import { snackBarTimeout } from "@/common/variables";

// Services
import { DataService } from "@/services/data.service";
import { SessionService } from "@/services/session.service";

@Component({})
export default class Toolbar extends Vue {
  @Prop() firstName: string;
  @Prop() lastName: string;

  @Emit("getShowLoadingScreen")
  willLoadingScreenShow(val: boolean) {
    return val;
  }

  timeout = snackBarTimeout;

  DataService: DataService;
  sessionService: SessionService;

  constructor() {
    super();

    this.DataService = new DataService();
    this.sessionService = new SessionService();

    this.firstName = "";
    this.lastName = "";
  }

  closeSession() {
    this.sessionService.closeSession("activeUser");
    this.willLoadingScreenShow(true);
    setTimeout(
      () => (this.willLoadingScreenShow(true), this.$router.push("/")),
      this.timeout
    );
  }
}
</script>
