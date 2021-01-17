<template>
  <div>
    <Toolbar
      :firstName="activeUser.FirstName"
      :lastName="activeUser.LastName"
    />

    <v-container>
      <v-row>
        <v-col cols="8">
          <h1>Welcome {{ activeUser.FirstName }} {{ activeUser.LastName }}</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Toolbar from "../../common/Toolbar/Index.vue";

import { UserService } from "../../services/user.service";
import { User } from "../../models/User";

@Component({
  components: { Toolbar }
})
export default class Dashboard extends Vue {
  userService: UserService;
  activeUser: User;

  activeEmailAddress: string;

  constructor() {
    super();

    this.userService = new UserService();
    this.activeEmailAddress = this.userService.getActiveUser();
    this.activeUser = new User();
  }

  mounted() {
    this.validateActiveUser();
  }

  validateActiveUser() {
    if (this.activeEmailAddress === "null") {
      this.$router.push("/");
    } else {
      this.activeUser = this.userService.getUserById(this.activeEmailAddress);
    }
  }
}
</script>
