<template>
  <v-container>
    <v-row class="d-flex flex-column align-center">
      <v-col cols="4">
        <h1 class="text-h4 text-center pa-8">Register Account :D</h1>
      </v-col>
    </v-row>

    <v-row class="d-flex flex-column align-center">
      <v-col cols="6">
        <v-form
          class="d-flex flex-column"
          ref="form"
          v-model="valid"
          lazy-validation
        >
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
              <v-btn
                color="primary"
                class="ml-2"
                :disabled="!valid"
                @click="registerUser"
              >
                Register Info
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <LoadingScreen v-if="showLoadingScreen" />
    <Snackbar
      :isSnackbarOpen="isSnackbarOpen"
      :snackbarText="snackbarText"
      :snackbarColor="snackbarColor"
      @closeSnackbar="closeSnackbar"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";

// Common variables
import {
  inputValidationRules,
  snackBarTimeout,
  successColor
} from "@/common/variables";

// Services
import { UserService } from "@/services/user.service";

// Models
import { User } from "@/models/User";
import { Response } from "@/models/Response";
import { StatusEnum } from "@/models/StatusEnum";
import { VForm } from "@/models/Types";

// Other components
import Snackbar from "@/common/Snackbar/Index.vue";
import LoadingScreen from "@/common/LoadingScreen/Index.vue";

@Component({
  components: { Snackbar, LoadingScreen }
})
export default class Register extends Vue {
  @Ref("form") readonly form!: VForm;

  rules = inputValidationRules;
  timeout = snackBarTimeout;

  userService: UserService;
  userToBeRegistered: User;

  snackbarText: string;
  snackbarColor: string;

  showPassword: boolean;
  isSnackbarOpen: boolean;
  showLoadingScreen: boolean;
  valid: boolean;

  constructor() {
    super();

    this.userService = new UserService();
    this.userToBeRegistered = new User();

    this.snackbarText = "";
    this.snackbarColor = "";

    this.showPassword = false;
    this.isSnackbarOpen = false;
    this.showLoadingScreen = false;
    this.valid = true;
  }

  registerUser() {
    this.form.validate();
    if (!this.areValuesCorrect()) {
      this.openSnackbar("Please complete all the fields", "error");
    } else {
      this.showLoadingScreen = true;
      this.userService
        .registerUser(this.userToBeRegistered)
        .then((res: Response) => {
          if (res.Type === StatusEnum.Success) {
            this.openSnackbar(res.Message, (this.snackbarColor = successColor));
            this.showLoadingScreen = false;
          }
        });
    }
  }

  areValuesCorrect() {
    const validFirstName = this.rules.required(
        this.userToBeRegistered.FirstName
      ),
      validLastName = this.rules.required(this.userToBeRegistered.LastName),
      validEmail =
        this.rules.required(this.userToBeRegistered.EmailAddress) &&
        this.rules.email(this.userToBeRegistered.EmailAddress),
      validPassword =
        this.rules.required(this.userToBeRegistered.Password) &&
        this.rules.min(this.userToBeRegistered.Password);

    if (
      validFirstName === true &&
      validLastName === true &&
      validEmail === true &&
      validPassword === true
    ) {
      return true;
    } else {
      return false;
    }
  }

  openSnackbar(text: string, color: string) {
    this.isSnackbarOpen = true;
    this.snackbarText = text;
    this.snackbarColor = color;
    setTimeout(() => this.closeSnackbar(), this.timeout);
  }

  closeSnackbar() {
    this.isSnackbarOpen = false;
    this.snackbarText = "";
    this.snackbarColor = "";
  }
}
</script>
