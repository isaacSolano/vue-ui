<template>
  <v-overlay :value="true">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class LoadingScreen extends Vue {}
</script>
