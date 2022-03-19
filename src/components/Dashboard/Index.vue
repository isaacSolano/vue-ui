<template>
  <div>
    <Toolbar
      :firstName="activeUser.FirstName"
      :lastName="activeUser.LastName"
      @getShowLoadingScreen="changeValue"
    />

    <v-container>
      <v-row>
        <v-col cols="8">
          <h1>Welcome {{ activeUser.FirstName }} {{ activeUser.LastName }}</h1>
        </v-col>
      </v-row>

      <LoadingScreen v-if="showLoadingScreen" />
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// Common variables
import { snackBarTimeout } from "@/common/variables";

// Services
import { DataService } from "@/services/data.service";
import { SessionService } from "@/services/session.service";

// Models
import { User } from "@/models/User";

// Other components
import Toolbar from "@/common/Toolbar/Index.vue";
import LoadingScreen from "@/common/LoadingScreen/Index.vue";

@Component({
  components: { Toolbar, LoadingScreen }
})
export default class Dashboard extends Vue {
  timeout = snackBarTimeout;

  DataService: DataService;
  sessionService: SessionService;

  activeUser: User;

  activeEmailAddress: string;

  showLoadingScreen: boolean;

  constructor() {
    super();

    this.DataService = new DataService();
    this.sessionService = new SessionService();

    this.activeUser = new User();

    this.activeEmailAddress = this.sessionService.getSession("activeUser");

    this.showLoadingScreen = false;
  }

  mounted() {
    this.validateActiveUser();
  }

  validateActiveUser() {
    if (this.activeEmailAddress === "not-found") {
      this.$router.push("/");
    } else {
      this.activeUser = this.DataService.getUserById(this.activeEmailAddress);
    }
  }

  changeValue(val: boolean) {
    this.showLoadingScreen = val;
  }
}
</script>
