<template>
  <div
    class="pallet"
    @click="selectPallet()"
    :class="{ selected: sellectedPallet === palletType }"
  >
    {{ palletType }}
  </div>
</template>

<script>
export default {
  name: "PalletType",
  props: {
    palletType: String,
    sellectedPallet: String,
  },
  methods: {
    selectPallet() {
      this.$emit("selectPallet", this.palletType);
    },
  },
};
</script>
<style scoped></style>
