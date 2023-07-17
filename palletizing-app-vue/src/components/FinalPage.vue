<template>
  <div class="col-12 border-thin p-0 py-3">
    <div class="head text-center border-bottom-thin">
      <p>Thank you for using Palletizing Application</p>
    </div>
    <!-- list out payload property center aligned -->
    <div class="row">
      <div class="col-5 p-5">
        <h4>Pallet: {{ payload.pallet }}</h4>
        <p>
          Dimensions: {{ payload.objectDimension?.length }}mm x
          {{ payload.objectDimension?.width }}mm
        </p>
        <p>Number of Objects: {{ payload.numberOfObjects }}</p>

        <h5>Objects:</h5>
        <ol>
          <li v-for="obj in payload.objects" v-bind:key="obj">
            <p>Position: X: {{ obj?.x }}, Y: {{ obj?.y }}</p>
          </li>
        </ol>
      </div>
      <div class="col-7">
        <div class="content text-center">
          <img src="../assets/images/tray.png" alt="" class="tray-image" />
        </div>
      </div>
    </div>

    <div class="col-12 text-right">
      <button
        type="button"
        class="btn btn-outline-dark"
        @click="$emit('goToNextPage', { state: 'INITIAL' })"
      >
        Restart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinalPage",
  props: {
    payload: Object,
  },
};
</script>

<style scoped></style>
