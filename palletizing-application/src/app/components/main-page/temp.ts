import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { palletMapping } from 'src/app/constants/app.constant';
import {
  IObject,
  IObjectDimension,
  PalletType,
  States,
} from 'src/app/models/app.model';
import { calculateAspectRatio } from 'src/app/utils/app.util';

export class MainPageComponent implements AfterViewInit {
  @Output() gotoNextPageEvent = new EventEmitter<{
    state: States;
    objects: IObject[];
    pallet: PalletType;
    numberOfObjects: number;
    dimension: IObjectDimension;
  }>();
  palletPlanningControl = new FormControl<boolean>(true);
  palletLengthControl = new FormControl<number>(1);
  palletWidthControl = new FormControl<number>(1);
  numberOfObjectsControl = new FormControl<number>(1);
  palletType: PalletType = 'EURO 1';
  objectOrientation: 'HORIZONTAL' | 'VERTICAL' = 'HORIZONTAL';
  palletWidth = 0;
  palletHeight = 0;
  objectMaxHeight = 0;
  objectMaxWidth = 0;
  objectsInPallet: IObject[] = [];
  selectedObject: { object: IObject; index: number } | null = null;
  palletMappings = palletMapping;
  boundryDimensions: DOMRect | null = null;
  aspectRatio!: { aspectWidth: number; aspectHeight: number };

  @ViewChild('palletArea') palletArea!: ElementRef<HTMLDivElement>;
  @ViewChild('palletBox') palletBox!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.selectPallet('EURO 1');
  }

  /**
   * The savePalletSettings function updates the value of the palletPlanningControl to false.
   */
  savePalletSettings() {
    this.palletPlanningControl.patchValue(false);
  }

  /**
   * The `copyObject` function copies the selected object and adds it to the objects in the pallet.
   */
  copyObject() {
    if (this.selectedObject && this.findOutBoundryOverflow()) {
      this.objectsInPallet.push({ ...this.selectedObject.object });
      // this.reAssignDragableEventListeners();
    }
  }

  addObject() {
    if (
      this.palletWidthControl.value &&
      this.palletLengthControl.value &&
      this.findOutBoundryOverflow()
    ) {
      this.objectsInPallet.push({
        x: 0,
        y: 0,
        orientation: this.objectOrientation,
      });
      // this.reAssignDragableEventListeners();
    }
  }

  // reAssignDragableEventListeners() {
  //   setTimeout(() => {
  //     let items = document.querySelectorAll('.object');
  //     console.log(items);

  //     items.forEach((item) => {
  //       console.log(item);

  //       item.addEventListener('dragstart', this.handleDragStart);
  //       item.addEventListener('dragend', this.handleDragEnd);
  //     });
  //   }, 500);
  // }

  handleDragStart(e: any) {
    console.log(e);
  }

  handleDragEnd(e: any) {
    console.log(e);
  }

  getPalletDimensionMapping(pallet: PalletType) {
    return palletMapping[pallet];
  }

  /**
   * The function sets the dimensions of a pallet based on a given pallet type and the width of a
   * container.
   */
  setPalletDimension() {
    const pallet = this.getPalletDimensionMapping(this.palletType);
    this.aspectRatio = calculateAspectRatio(pallet.width, pallet.length);
    // setting pallet sixe - with to 80% of visible screen then height is
    // calculated based on aspect ratio to the width
    const palletContainerWidth = this.palletArea.nativeElement.offsetWidth;
    this.palletWidth = palletContainerWidth * 0.8;
    this.palletHeight =
      (this.palletWidth / this.aspectRatio.aspectWidth) *
      this.aspectRatio.aspectHeight;
    console.log(this.palletWidth, this.palletHeight);
  }

  /**
   * The function "selectPallet" sets the pallet type, dimensions, and input range limits.
   * @param {PalletType} palletType - The `palletType` parameter is a variable of type `PalletType`. It
   * is used to specify the type of pallet that will be selected.
   */
  selectPallet(palletType: PalletType) {
    this.palletType = palletType;
    this.setPalletDimension();
    this.setInputRangeLimits();
  }

  /**
   * The function sets the input range limits for the pallet width and length controls, and updates the
   * maximum height and width of the object based on the pallet dimensions.
   */
  setInputRangeLimits() {
    this.palletWidthControl.patchValue(1);
    this.palletLengthControl.patchValue(1);
    this.objectMaxHeight = this.palletHeight;
    this.objectMaxWidth = this.palletWidth;
  }

  /**
   * The function "selectObjectForModification" selects an object and its index for modification.
   * @param {IObject} object - The "object" parameter is of type IObject, which means it represents an
   * object with specific properties and methods defined in the IObject interface.
   * @param {number} index - The index parameter is a number that represents the position of the object
   * in a collection or array.
   */
  selectObjectForModification(object: IObject, index: number) {
    this.selectedObject = { object, index };
  }

  /**
   * The `removeObject` function removes the selected object from the `objectsInPallet` array.
   */
  removeObject() {
    if (this.selectedObject) {
      this.objectsInPallet.splice(this.selectedObject.index, 1);
      this.selectedObject = null;
    }
  }

  /**
   * The savePallet function calculates object positions and emits an event with the objects, pallet
   * type, number of objects, and pallet dimensions if all required values are provided.
   */
  savePallet() {
    this.calculateObjectPositions();
    if (
      this.numberOfObjectsControl.value &&
      this.palletLengthControl.value &&
      this.palletWidthControl.value
    ) {
      this.gotoNextPageEvent.emit({
        state: 'FINISH',
        objects: this.objectsInPallet,
        pallet: this.palletType,
        numberOfObjects: this.numberOfObjectsControl.value,
        dimension: this.getPalletDimensionMapping(this.palletType),
      });
    }
  }

  /**
   * The function calculates the positions of objects on a pallet based on their orientation and the
   * dimensions of the pallet.
   */
  calculateObjectPositions() {
    const palletLength = this.palletLengthControl.value;
    const palletWidth = this.palletWidthControl.value;

    this.objectsInPallet = this.objectsInPallet.map((object, index) => {
      const objectPositions = document
        .getElementById('object-' + index)
        ?.getBoundingClientRect();

      if (objectPositions && palletLength && palletWidth) {
        const xDiff = objectPositions.x - this.boundryDimensions!.x;
        const yDiff = objectPositions.y - this.boundryDimensions!.y;
        console.log(xDiff, yDiff, objectPositions, this.boundryDimensions);

        const aspectWidth = this.aspectRatio.aspectWidth;
        const aspectHeight = this.aspectRatio.aspectHeight;
        // const pallet = this.getPalletDimensionMapping(this.palletType);
        console.log(aspectWidth, aspectHeight);

        object.x =
          object.orientation === 'VERTICAL'
            ? xDiff + (palletLength / 2) * aspectHeight
            : xDiff + (palletWidth / 2) * aspectWidth;
        // object.orientation === 'VERTICAL'
        //   ? ((xDiff + palletLength / 2) / palletLength) * pallet.length
        //   : ((xDiff + palletWidth / 2) / palletWidth) * pallet.width;

        object.y =
          object.orientation === 'VERTICAL'
            ? yDiff + (palletWidth / 2) * aspectWidth
            : yDiff + (palletLength / 2) * aspectHeight;
        // object.orientation === 'VERTICAL'
        //   ? ((yDiff + palletWidth / 2) / palletWidth) * pallet.width
        //   : ((yDiff + palletLength / 2) / palletLength) * pallet.length;
      }
      return object;
    });

    console.log(this.objectsInPallet);
  }

  /**
   * The function `findOutBoundryOverflow()` checks if the last object in a pallet exceeds the boundaries
   * of the pallet and returns true if it does not, or false if it does.
   * @returns a boolean value. If the condition in the if statement is true, it will return false.
   * Otherwise, it will return true.
   */
  findOutBoundryOverflow() {
    this.boundryDimensions =
      this.palletBox.nativeElement.getBoundingClientRect();

    const objectCount = this.objectsInPallet.length;
    const palletLength = this.palletLengthControl.value;
    const palletWidth = this.palletWidthControl.value;

    if (objectCount && palletLength && palletWidth) {
      const lastObject = document
        .getElementById('object-' + (objectCount - 1))
        ?.getBoundingClientRect();
      const boundary = this.palletBox.nativeElement.getBoundingClientRect();

      if (lastObject && lastObject.right + palletLength > boundary.right) {
        const isOverflow =
          (this.objectOrientation === 'HORIZONTAL' &&
            lastObject.bottom + palletWidth > boundary.bottom) ||
          (this.objectOrientation === 'VERTICAL' &&
            lastObject.bottom + palletLength > boundary.bottom);

        if (isOverflow) {
          alert('Pallet is full');
          return false;
        }
      }
    }

    return true;
  }
}

// boundary condition check main logic
// if (
//   this.objectOrientation === 'HORIZONTAL' &&
//   lastObjectDimensions?.right + this.palletWidthControl.value >
//     this.boundryDimensions?.right
// ) {
//   if (
//     lastObjectDimensions.bottom + this.palletLengthControl.value >
//     this.boundryDimensions?.bottom
//   ) {
//     alert('Pallet is full');
//     return false;
//   }
// } else if (
//   this.objectOrientation === 'VERTICAL' &&
//   lastObjectDimensions?.right + this.palletLengthControl.value >
//     this.boundryDimensions?.right
// ) {
//   if (
//     lastObjectDimensions.bottom + this.palletWidthControl.value >
//     this.boundryDimensions.bottom
//   ) {
//     alert('Pallet is full');
//     return false;
//   }
// }



isWithinBoundary() {
    if (
      this.objectsInPallet.length > 0 &&
      this.objectLengthControl.value &&
      this.objectWidthControl.value
    ) {
      const lastObjectDimensions = document
        .getElementById('object-' + (this.objectsInPallet.length - 1))
        ?.getBoundingClientRect();
      this.boundryDimensions =
        this.palletBox.nativeElement.getBoundingClientRect();

      if (lastObjectDimensions) {
        const objectRight = lastObjectDimensions.right;
        const objectBottom = lastObjectDimensions.bottom;

        if (
          (this.objectOrientation === 'HORIZONTAL' &&
            objectRight + this.objectWidthControl.value >
              this.boundryDimensions.right) ||
          (this.objectOrientation === 'VERTICAL' &&
            objectRight + this.objectLengthControl.value >
              this.boundryDimensions.right)
        ) {
          if (
            objectBottom +
              (this.objectOrientation === 'HORIZONTAL'
                ? this.objectLengthControl.value
                : this.objectWidthControl.value) >
            (this.objectOrientation === 'HORIZONTAL'
              ? this.boundryDimensions.bottom
              : this.boundryDimensions.bottom)
          ) {
            alert('Pallet is full');
            return false;
          }
        }
      }
    }
    return true;
  }