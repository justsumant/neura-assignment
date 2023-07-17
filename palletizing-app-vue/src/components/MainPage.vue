<template>
  <div class="row">
    <!-- left side -->
    <div class="col-4 border-thin p-0 py-3">
      <div class="head text-right border-bottom-thin px-2">
        <span class="label">Pallet Planning </span>
        <label class="switch">
          <input type="checkbox" v-model="palletPlanning" />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="content p-4">
        <div :class="{ overlay: !palletPlanning }"></div>
        <!-- pallet type selection -->
        <div class="row">
          <div class="col-12">
            <p>Pallet Info</p>
          </div>
          <div
            class="col-6"
            v-for="(value, key) in palletMappings"
            v-bind:key="value"
          >
            <PalletType
              :sellectedPallet="palletType"
              :palletType="key"
              @selectPallet="selectPalletType"
            />
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12">
            <p>Object Dimension</p>
          </div>
          <div class="col-8 mt-4">
            <div class="form-group">
              <label for="length">Length mm</label>
              <input
                type="range"
                class="form-control-range"
                id="length"
                v-model="objectLengthControl"
                min="1"
                step="1"
                :max="objectMaxHeight"
              />
            </div>
          </div>
          <div class="col-4 mt-4">
            <input
              type="number"
              class="form-control mt-3"
              v-model="objectLengthControl"
            />
          </div>
          <div class="col-8 mt-5">
            <div class="form-group">
              <label for="width">Width mm</label>
              <input
                type="range"
                class="form-control-range"
                id="width"
                v-model="objectWidthControl"
                min="1"
                step="1"
                :max="objectMaxWidth"
              />
            </div>
          </div>
          <div class="col-4 mt-5">
            <input
              type="number"
              class="form-control mt-3"
              v-model="objectWidthControl"
            />
          </div>
          <div class="col-8 mt-5">
            <label for="number-of-objects" class="pt-1"
              >Number of Objects
            </label>
          </div>
          <div class="col-4 mt-5">
            <input
              type="number"
              class="form-control"
              v-model="numberOfObjectsControl"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-right">
          <button
            type="button"
            class="btn btn-outline-dark m-3"
            @click="savePalletSettings()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <!-- right side -->
    <div class="col-8 border-thin p-0 py-3">
      <div class="head border-bottom-thin px-2">
        <h5 class="m-0">{{ palletType }}</h5>
        <p>
          {{ getPalletDimensionMapping(palletType).length }} X
          {{ getPalletDimensionMapping(palletType).width }} (L X W)
        </p>
      </div>
      <div class="content text-center" id="palletArea">
        <div :class="{ overlay: palletPlanning }"></div>
        <div class="row mx-0">
          <div class="col my-3 object-buttons">
            <img
              src="../assets/images/pallet-horizontal.png"
              alt=""
              class="object-button1"
              :class="{ selected: objectOrientation === 'HORIZONTAL' }"
              @click="objectOrientation = 'HORIZONTAL'"
            />
            <img
              src="../assets/images/pallet-vertical.png"
              alt=""
              class="object-button2"
              :class="{ selected: objectOrientation === 'VERTICAL' }"
              @click="objectOrientation = 'VERTICAL'"
            />
            <button
              type="button"
              class="btn btn-outline-dark add-object-button"
              @click="addObject()"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div>
          <div
            id="palletBox"
            class="main-pallet-box m-auto"
            :style="{ width: palletWidth + 'px', height: palletHeight + 'px' }"
          >
            <div
              v-for="(object, index) in objectsInPallet"
              v-bind:key="index"
              class="object"
              :id="'object-' + index"
              draggable="true"
              :style="{
                width:
                  object.orientation === 'HORIZONTAL'
                    ? objectWidthControl + 'px'
                    : objectLengthControl + 'px',
                height:
                  object.orientation === 'HORIZONTAL'
                    ? objectLengthControl + 'px'
                    : objectWidthControl + 'px',
              }"
              @click="selectObjectForModification(object.orientation, index)"
              :class="{ selected: selectedObject?.index === index }"
            >
              {{ index }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 mt-3 d-flex justify-content-between">
        <div class="text-left">
          <button
            type="button"
            class="btn btn-danger ml-2"
            @click="removeObject()"
            v-if="selectedObject"
          >
            <i class="fa-regular fa-trash-can"></i>
          </button>
          <button
            type="button"
            class="btn btn-secondary ml-2"
            @click="copyObject()"
            v-if="selectedObject"
          >
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
        <div class="text-right">
          <button
            type="button"
            class="btn btn-outline-dark ml-2"
            @click="savePallet()"
            :disabled="objectsInPallet.length !== numberOfObjectsControl"
          >
            save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PalletType from "./PalletType.vue";
export default {
  name: "MainPage",
  components: {
    PalletType,
  },

  data() {
    return {
      palletPlanning: true,
      objectLengthControl: 1,
      objectWidthControl: 1,
      numberOfObjectsControl: 1,
      palletType: "EURO 1",
      objectOrientation: "HORIZONTAL",
      palletWidth: 0,
      palletHeight: 0,
      objectMaxHeight: 0,
      objectMaxWidth: 0,
      objectsInPallet: [],
      selectedObject: null,
      palletMappings: {
        "EURO 1": {
          length: 1200,
          width: 800,
        },
        "EURO 2": {
          length: 1000,
          width: 1200,
        },
        "EURO 3": {
          length: 1200,
          width: 1000,
        },
        "EURO 4": {
          length: 600,
          width: 800,
        },
      },
      boundryDimensions: null,
      aspectRatio: undefined,
    };
  },
  props: {},
  methods: {
    getPalletDimensionMapping(pallet) {
      return this.palletMappings[pallet];
    },

    selectPalletType(palletType) {
      this.palletType = palletType;
      this.setPalletDimension();
      this.setInputRangeLimits();
    },
    addObject() {
      if (
        this.objectWidthControl &&
        this.objectLengthControl &&
        this.isWithinBoundary()
      ) {
        this.objectsInPallet.push({
          orientation: this.objectOrientation,
        });
      }
    },
    isWithinBoundary() {
      this.boundryDimensions = document
        .getElementById("palletBox")
        .getBoundingClientRect();
      if (
        this.objectsInPallet.length > 0 &&
        this.objectLengthControl &&
        this.objectWidthControl
      ) {
        const lastObjectDimensions = document
          .getElementById("object-" + (this.objectsInPallet.length - 1))
          ?.getBoundingClientRect();

        if (lastObjectDimensions) {
          const objectRight = lastObjectDimensions.right;
          const objectBottom = lastObjectDimensions.bottom;

          const isRightSideOverflow =
            (this.objectOrientation === "HORIZONTAL" &&
              objectRight + this.objectWidthControl >
                this.boundryDimensions.right) ||
            (this.objectOrientation === "VERTICAL" &&
              objectRight + this.objectLengthControl >
                this.boundryDimensions.right);

          const isBottomSideOverflow =
            objectBottom +
              (this.objectOrientation === "HORIZONTAL"
                ? this.objectLengthControl
                : this.objectWidthControl) >
            (this.objectOrientation === "HORIZONTAL"
              ? this.boundryDimensions.bottom
              : this.boundryDimensions.bottom);

          if (isRightSideOverflow && isBottomSideOverflow) {
            alert("Pallet is full");
            return false;
          }
        }
      }
      return true;
    },
    selectObjectForModification(object, index) {
      this.selectedObject = { object, index };
    },
    removeObject() {
      if (this.selectedObject) {
        this.objectsInPallet.splice(this.selectedObject.index, 1);
        this.selectedObject = null;
      }
    },
    copyObject() {
      if (this.selectedObject && this.isWithinBoundary()) {
        this.objectsInPallet.push({ orientation: this.selectedObject.object });
      }
    },
    setPalletDimension() {
      const pallet = this.getPalletDimensionMapping(this.palletType);
      this.aspectRatio = this.calculateAspectRatio(pallet.width, pallet.length);
      // setting pallet sixe - with to 80% of visible screen then height is
      // calculated based on aspect ratio to the width
      const palletContainerWidth =
        document.getElementById("palletArea").offsetWidth;
      this.palletWidth = palletContainerWidth * 0.8;
      this.palletHeight =
        (this.palletWidth / this.aspectRatio.aspectWidth) *
        this.aspectRatio.aspectHeight;
    },

    setInputRangeLimits() {
      this.objectWidthControl = 1;
      this.objectLengthControl = 1;
      this.objectMaxHeight = this.palletHeight;
      this.objectMaxWidth = this.palletWidth;
    },
    savePallet() {
      if (
        this.numberOfObjectsControl &&
        this.objectLengthControl &&
        this.objectWidthControl
      ) {
        this.$emit("goToNextPage", {
          state: "FINISH",
          objects: this.getObjectsInPallet(),
          pallet: this.palletType,
          numberOfObjects: this.numberOfObjectsControl,
          dimension: this.getPalletDimensionMapping(this.palletType),
        });
      }
    },
    getObjectsInPallet() {
      const palletLength = this.objectLengthControl;
      const palletWidth = this.objectWidthControl;
      const objects = [];

      this.objectsInPallet.map((object, index) => {
        const objectPositions = document
          .getElementById("object-" + index)
          ?.getBoundingClientRect();
        if (objectPositions && palletLength && palletWidth) {
          const xDiff = objectPositions.x - this.boundryDimensions.x;
          const yDiff = objectPositions.y - this.boundryDimensions.y;

          const aspectWidth = this.aspectRatio.aspectWidth;
          const aspectHeight = this.aspectRatio.aspectHeight;

          const x =
            object.orientation === "VERTICAL"
              ? xDiff + (palletLength / 2) * aspectHeight
              : xDiff + (palletWidth / 2) * aspectWidth;

          const y =
            object.orientation === "VERTICAL"
              ? yDiff + (palletWidth / 2) * aspectWidth
              : yDiff + (palletLength / 2) * aspectHeight;

          objects.push({
            x,
            y,
            orientation: object.orientation,
          });
        }
      });
      return objects;
    },
    savePalletSettings() {
      this.palletPlanning = false;
    },
    // utility methods
    calculateAspectRatio(width, height) {
      const bigger = width > height ? width : height;
      const smaller = width < height ? width : height;

      const divisor = this.gcd(bigger, smaller);
      const aspectBigger = bigger / divisor;
      const aspectSmaller = smaller / divisor;

      if (width > height) {
        return { aspectWidth: aspectBigger, aspectHeight: aspectSmaller };
      } else {
        return { aspectWidth: aspectSmaller, aspectHeight: aspectBigger };
      }
    },
    gcd(a, b) {
      if (b === 0) {
        return a;
      }
      return this.gcd(b, a % b);
    },
  },

  mounted() {
    this.selectPalletType("EURO 1");
  },
};
</script>
<style></style>
