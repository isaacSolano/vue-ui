<template>
  <v-container>
    <v-row class="d-flex flex-column align-center">
      <v-col cols="6">
        <h1 class="text-h4 text-center pa-8">Access to your account :)</h1>
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
              <v-btn
                color="primary"
                class="ml-2"
                :disabled="!valid"
                @click="verifyInformation"
              >
                Let's go !
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <LoadingScreen v-if="showLoadingScreen" />
    <Snackbar
      :snackbarText="snackbarText"
      :snackbarColor="snackbarColor"
      :isSnackbarOpen="isSnackbarOpen"
      @closeSnackbar="closeSnackbar"
    />
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";

// Common
import {
  inputValidationRules,
  snackBarTimeout,
  successColor
} from "@/common/variables";

// Services
import { DataService } from "@/services/data.service";
import { SessionService } from "@/services/session.service";

// Models
import { Response } from "@/models/Response";
import { VForm } from "@/models/Types";

// Other components
import LoadingScreen from "@/common/LoadingScreen/Index.vue";
import Snackbar from "@/common/Snackbar/Index.vue";
import { ResponseStatusType } from "@/models/ResponseStatusType";

@Component({
  components: { LoadingScreen, Snackbar }
})
export default class Login extends Vue {
  @Ref("form") readonly form!: VForm;

  rules = inputValidationRules;
  timeout = snackBarTimeout;

  DataService: DataService;
  sessionService: SessionService;

  EmailAddress: string;
  Password: string;
  snackbarText: string;
  snackbarColor: string;

  showPassword: boolean;
  isSnackbarOpen: boolean;
  showLoadingScreen: boolean;
  valid: boolean;

  constructor() {
    super();

    this.DataService = new DataService();
    this.sessionService = new SessionService();

    this.EmailAddress = "";
    this.Password = "";
    this.snackbarText = "";
    this.snackbarColor = "";

    this.showPassword = false;
    this.isSnackbarOpen = false;
    this.showLoadingScreen = false;
    this.valid = true;
  }

  verifyInformation() {
    this.form.validate();
    if (this.EmailAddress === "" || this.Password === "") {
      this.openSnackbar("Please complete all the fields", "error");
    } else {
      this.DataService
        .loginUser(this.EmailAddress, this.Password)
        .then((res: Response) => {
          this.isSnackbarOpen = true;
          switch (res.Type) {
            case ResponseStatusType.ERROR:
              this.openSnackbar(res.Message, "error");
              break;

            case ResponseStatusType.SUCCESS:
              this.openSnackbar(res.Message, successColor);
              this.showLoadingScreen = true;
              this.sessionService.createSession(
                "activeUser",
                this.EmailAddress
              );
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
    setTimeout(() => this.closeSnackbar(), this.timeout);
  }

  closeSnackbar() {
    this.isSnackbarOpen = false;
    this.snackbarText = "";
    this.snackbarColor = "";
  }
}
</script>
