<template>
  <v-container>
    <v-row class="d-flex flex-column align-center">
      <v-col cols="4">
        <h1 class="text-h4 text-center pa-8">Access to your account :)</h1>
      </v-col>
    </v-row>

    <v-row class="d-flex flex-column align-center">
      <v-col cols="6">
        <v-form class="d-flex flex-column">
          <v-row class="d-flex flex-column">
            <v-col>
              <v-label>Email Address: </v-label>
              <v-text-field
                class="mt-4"
                label="johnsmith@email.com"
                v-model="EmailAddress"
                :rules="[rules.required, rules.email]"
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex flex-column">
            <v-col>
              <v-label class="">Password: </v-label>
              <v-text-field
                class="mt-4"
                label="********"
                v-model="Password"
                :rules="[rules.required, rules.min]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex-flex-column">
            <v-col>
              <v-btn to="/" color="secondary" class="mr-2">
                Back
              </v-btn>
              <v-btn color="primary" class="ml-2" @click="verifyInformation()">
                Let's go !
              </v-btn>
              <!-- Snackbar Start -->
              <v-snackbar
                v-model="isSnackbarOpen"
                :color="snackbarColor"
                :timeout="timeout"
              >
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    fab
                    small
                    text
                    v-bind="attrs"
                    @click="isSnackbarOpen = false"
                  >
                    <v-icon dark>mdi-close</v-icon>
                  </v-btn>
                </template>
              </v-snackbar>
              <!-- Snackbar End -->
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <LoadingScreen v-if="showLoadingScreen" />
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import LoadingScreen from "../../common/LoadingScreen/Index.vue";

import {
  inputValidationRules,
  snackBarTimeout,
  successColor
} from "../../common/variables";
import { UserService } from "../../services/user.service";
import { Response } from "../../models/Response";

@Component({
  components: { LoadingScreen }
})
export default class Login extends Vue {
  rules = inputValidationRules;
  timeout = snackBarTimeout;

  userService: UserService;

  EmailAddress: string;
  Password: string;
  snackbarText: string;
  snackbarColor: string;

  showPassword: boolean;
  isSnackbarOpen: boolean;
  showLoadingScreen: boolean;

  constructor() {
    super();

    this.userService = new UserService();

    this.EmailAddress = "";
    this.Password = "";
    this.snackbarText = "";
    this.snackbarColor = "";

    this.showPassword = false;
    this.isSnackbarOpen = false;
    this.showLoadingScreen = false;
  }

  verifyInformation() {
    if (this.EmailAddress === "" || this.Password === "") {
      this.openSnackbar("Please complete all the fields", "error");
    } else {
      this.userService
        .loginUser(this.EmailAddress, this.Password)
        .then((res: Response) => {
          this.isSnackbarOpen = true;
          switch (res.Type) {
            case "Error":
              this.openSnackbar(res.Message, "error");
              break;

            case "Success":
              this.openSnackbar(res.Message, successColor);
              this.showLoadingScreen = true;
              this.userService.setActiveUser(this.EmailAddress);
              setTimeout(
                () => (
                  (this.showLoadingScreen = false),
                  this.$router.push("dashboard")
                ),
                this.timeout
              );
              break;
          }
        });
    }
  }

  openSnackbar(text: string, color: string) {
    this.isSnackbarOpen = true;
    this.snackbarText = text;
    this.snackbarColor = color;
  }
}
</script>
