<template>
  <section class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h3 class="text-center">Palletizing Application</h3>
      </div>
    </div>
  </section>
  <section class="container mt-4">
    <!-- 1st page -->
    <!-- <div > -->
    <!-- {{ state }} -->
    <!-- </div> -->

    <InitailPage @goToNextPage="goToNextPage" v-if="state === 'INITIAL'" />
    <MainPage @goToNextPage="goToNextPage" v-if="state === 'MAIN'" />
    <FinalPage
      @goToNextPage="goToNextPage"
      v-bind:payload="payload"
      v-if="state === 'FINISH'"
    />
  </section>
</template>

<script>
import InitailPage from "./components/InitailPage.vue";
import MainPage from "./components/MainPage.vue";
import FinalPage from "./components/FinalPage.vue";

export default {
  name: "App",
  data() {
    return {
      state: "INITIAL",
      payload: undefined,
    };
  },
  components: {
    InitailPage,
    MainPage,
    FinalPage,
  },
  methods: {
    goToNextPage(event) {
      this.state = event.state;
      if (event.objects) {
        this.payload = {
          numberOfObjects: event.numberOfObjects,
          objectDimension: event.dimension,
          objects: event.objects,
          pallet: event.pallet,
        };
      }
    },
  },
};
</script>

<style></style>
