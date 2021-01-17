<template>
  <v-container>
    <v-row class="d-flex flex-column align-center">
      <v-col cols="4">
        <h1 class="text-h4 text-center pa-8">Register Account :D</h1>
      </v-col>
    </v-row>

    <v-row class="d-flex flex-column align-center">
      <v-col cols="6">
        <v-form class="d-flex flex-column">
          <v-row class="d-flex flex-row">
            <v-col cols="6">
              <v-label>First Name: </v-label>
              <v-text-field
                class="mt-4"
                label="John"
                v-model="userToBeRegistered.FirstName"
                :rules="[rules.required]"
                solo
              ></v-text-field>
            </v-col>

            <v-col>
              <v-label>Last Name: </v-label>
              <v-text-field
                class="mt-4"
                label="Smith"
                v-model="userToBeRegistered.LastName"
                :rules="[rules.required]"
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex flex-column">
            <v-col>
              <v-label>Email Address: </v-label>
              <v-text-field
                class="mt-4"
                label="johnsmith@email.com"
                v-model="userToBeRegistered.EmailAddress"
                :rules="[rules.required, rules.email]"
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex flex-column">
            <v-col>
              <v-label>Password: </v-label>
              <v-text-field
                class="mt-4"
                label="********"
                v-model="userToBeRegistered.Password"
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
              <v-btn color="primary" class="ml-2" @click="registerUser()">
                Register Info
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// Models
import { User } from "../../models/User";

import {
  inputValidationRules,
  snackBarTimeout,
  successColor
} from "../../common/variables";
import { UserService } from "../../services/user.service";

@Component({})
export default class Register extends Vue {
  rules = inputValidationRules;
  timeout = snackBarTimeout;

  userToBeRegistered: User;
  userService: UserService;

  snackbarText: string;
  snackbarColor: string;

  showPassword: boolean;
  isSnackbarOpen: boolean;

  constructor() {
    super();

    this.userToBeRegistered = new User();
    this.userService = new UserService();

    this.snackbarText = "";
    this.snackbarColor = "";

    this.showPassword = false;
    this.isSnackbarOpen = false;
  }

  registerUser() {
    if (
      this.userToBeRegistered.FirstName === "" ||
      this.userToBeRegistered.LastName === "" ||
      this.userToBeRegistered.EmailAddress === "" ||
      this.userToBeRegistered.Password === ""
    ) {
      this.isSnackbarOpen = true;
      this.snackbarText = "Please complete all the fields";
      this.snackbarColor = "error";
    } else {
      this.snackbarText = this.userService.registerUser(
        this.userToBeRegistered
      );
      this.snackbarColor = successColor;
    }
  }

  openSnackbar(text: string, color: string) {
    this.isSnackbarOpen = true;
    this.snackbarText = text;
    this.snackbarColor = color;
  }
}
</script>
