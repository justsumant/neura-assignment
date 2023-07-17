<template>
  <div class="row">
    <!-- left side -->
    <div class="col-4 border-thin p-0 py-3">
      <div class="head text-right border-bottom-thin"></div>
      <div class="content text-center">
        <img src="../assets/images/pallet.png" alt="" class="pallet-image" />
      </div>
    </div>
    <!-- right side -->
    <div class="col-8 border-thin p-0 py-3">
      <div class="head text-center border-bottom-thin">
        <p>Welcome to Palletizing Application</p>
      </div>
      <div class="content text-center">
        <img src="../assets/images/tray.png" alt="" class="tray-image" />
      </div>

      <div class="col-12 text-right">
        <button
          type="button"
          class="btn btn-outline-dark"
          @click="$emit('goToNextPage', { state: 'MAIN' })"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitailPage",
  props: {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
