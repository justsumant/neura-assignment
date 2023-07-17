import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  PALLET_WIDTH_FACTOR,
  palletMapping,
} from 'src/app/constants/app.constant';
import {
  IObject,
  IObjectDimension,
  Orientation,
  PalletType,
  States,
} from 'src/app/models/app.model';
import { calculateAspectRatio } from 'src/app/utils/app.util';

@Component({
  selector: '[app-main-page]',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit {
  @Output() gotoNextPageEvent = new EventEmitter<{
    state: States;
    objects: IObject[];
    pallet: PalletType;
    numberOfObjects: number;
    dimension: IObjectDimension;
  }>();
  palletPlanningControl = new FormControl<boolean>(true);
  objectLengthControl = new FormControl<number>(1);
  objectWidthControl = new FormControl<number>(1);
  numberOfObjectsControl = new FormControl<number>(1);
  palletType: PalletType = 'EURO 1';
  objectOrientation: 'HORIZONTAL' | 'VERTICAL' = 'HORIZONTAL';
  palletWidth = 0;
  palletHeight = 0;
  objectMaxHeight = 0;
  objectMaxWidth = 0;
  objectsInPallet: { orientation: Orientation }[] = [];
  selectedObject: { object: Orientation; index: number } | null = null;
  palletMappings = palletMapping;
  boundryDimensions: DOMRect | null = null;
  aspectRatio!: { aspectWidth: number; aspectHeight: number };

  @ViewChild('palletArea') palletArea!: ElementRef<HTMLDivElement>;
  @ViewChild('palletBox') palletBox!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    // timeout is simply to avoid template load warning
    setTimeout(() => {
      this.selectPalletType('EURO 1');
    }, 100);
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
    if (this.selectedObject && this.isWithinBoundary()) {
      this.objectsInPallet.push({ orientation: this.selectedObject.object });
      // this.reAssignDragableEventListeners();
    }
  }

  addObject() {
    if (
      this.objectWidthControl.value &&
      this.objectLengthControl.value &&
      this.isWithinBoundary()
    ) {
      this.objectsInPallet.push({
        orientation: this.objectOrientation,
      });
      this.reAssignDragableEventListeners();
    }
  }

  reAssignDragableEventListeners() {
    setTimeout(() => {
      let items = document.querySelectorAll('.object');

      items.forEach((item) => {
        item.addEventListener('dragstart', this.handleDragStart);
        item.addEventListener('dragend', this.handleDragEnd);
      });
    }, 500);
  }

  handleDragStart(e: any) {
    // const boundry = this.palletBox.nativeElement.getBoundingClientRect();
    console.log(this.boundryDimensions, e);
  }

  handleDragEnd(e: any) {
    // console.log(this.palletBox.nativeElement.getBoundingClientRect(), e);
  }

  getPalletDimensionMapping(pallet: PalletType) {
    return palletMapping[pallet];
  }

  /**
   * The function sets the dimensions of a pallet based on a given pallet type and the width of a
   * container.
   */
  private setPalletDimension() {
    const pallet = this.getPalletDimensionMapping(this.palletType);
    this.aspectRatio = calculateAspectRatio(pallet.width, pallet.length);
    // setting pallet sixe - with to 80% of visible screen then height is
    // calculated based on aspect ratio to the width
    const palletContainerWidth = this.palletArea.nativeElement.offsetWidth;
    this.palletWidth = palletContainerWidth * PALLET_WIDTH_FACTOR;
    this.palletHeight =
      (this.palletWidth / this.aspectRatio.aspectWidth) *
      this.aspectRatio.aspectHeight;
  }

  /**
   * The function "selectPalletType" sets the pallet type, dimensions, and input range limits.
   * @param {PalletType} palletType - The `palletType` parameter is a variable of type `PalletType`. It
   * is used to specify the type of pallet that will be selected.
   */
  selectPalletType(palletType: PalletType) {
    this.palletType = palletType;
    this.setPalletDimension();
    this.setInputRangeLimits();
  }

  /**
   * The function sets the input range limits for the pallet width and length controls, and updates the
   * maximum height and width of the object based on the pallet dimensions.
   */
  private setInputRangeLimits() {
    this.objectWidthControl.patchValue(1);
    this.objectLengthControl.patchValue(1);
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
  selectObjectForModification(object: Orientation, index: number) {
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
    // this.calculateObjectPositions();
    if (
      this.numberOfObjectsControl.value &&
      this.objectLengthControl.value &&
      this.objectWidthControl.value
    ) {
      this.gotoNextPageEvent.emit({
        state: 'FINISH',
        objects: this.getObjectsInPallet(),
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
  getObjectsInPallet() {
    const palletLength = this.objectLengthControl.value;
    const palletWidth = this.objectWidthControl.value;
    const objects: IObject[] = [];

    this.objectsInPallet.map((object, index) => {
      const objectPositions = document
        .getElementById('object-' + index)
        ?.getBoundingClientRect();

      console.log(objectPositions, this.boundryDimensions);

      if (objectPositions && palletLength && palletWidth) {
        const xDiff = objectPositions.x - this.boundryDimensions!.x;
        const yDiff = objectPositions.y - this.boundryDimensions!.y;
        const aspectWidth = this.aspectRatio.aspectWidth;
        const aspectHeight = this.aspectRatio.aspectHeight;
        // const actualPalletSize = this.getPalletDimensionMapping(this.palletType);

        const x =
          object.orientation === 'VERTICAL'
            ? xDiff + (palletLength / 2) * aspectHeight
            : xDiff + (palletWidth / 2) * aspectWidth;
        // object.orientation === 'VERTICAL'
        // ? ((xDiff + this.objectLengthControl.value! / 2) /
        //     this.palletWidth) *
        //   actualPalletSize.width
        // : ((xDiff + this.objectWidthControl.value! / 2) /
        //     this.palletWidth) *
        //   actualPalletSize.width;

        const y =
          object.orientation === 'VERTICAL'
            ? yDiff + (palletWidth / 2) * aspectWidth
            : yDiff + (palletLength / 2) * aspectHeight;
        // object.orientation === 'VERTICAL'
        // ? ((yDiff + this.objectWidthControl.value! / 2) /
        //     this.palletWidth) *
        //   actualPalletSize.width
        // : ((yDiff + this.objectLengthControl.value! / 2) /
        //     this.palletHeight) *
        //   actualPalletSize.length;

        objects.push({
          x,
          y,
          orientation: object.orientation,
        });
      }
    });
    return objects;
  }

  /**
   * The function `isWithinBoundary()` checks if the last object in a pallet exceeds the boundaries
   * of the pallet and returns true if it does not, or false if it does.
   * @returns a boolean value. If the condition in the if statement is true, it will return false.
   * Otherwise, it will return true.
   */

  private isWithinBoundary() {
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

        const isRightSideOverflow =
          (this.objectOrientation === 'HORIZONTAL' &&
            objectRight + this.objectWidthControl.value >
              this.boundryDimensions.right) ||
          (this.objectOrientation === 'VERTICAL' &&
            objectRight + this.objectLengthControl.value >
              this.boundryDimensions.right);

        const isBottomSideOverflow =
          objectBottom +
            (this.objectOrientation === 'HORIZONTAL'
              ? this.objectLengthControl.value
              : this.objectWidthControl.value) >
          (this.objectOrientation === 'HORIZONTAL'
            ? this.boundryDimensions.bottom
            : this.boundryDimensions.bottom);

        if (isRightSideOverflow && isBottomSideOverflow) {
          alert('Pallet is full');
          return false;
        }
      }
    }
    return true;
  }
}
