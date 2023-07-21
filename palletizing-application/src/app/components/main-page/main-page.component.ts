import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  OBJECT_ID_PREFIX,
  OBJECT_IS_BIGGER_THAN_PALLET,
  PALLET_CONTAINER_HEIGHT,
  PALLET_IS_FULL,
  SETTINGS_PANEL_HEIGHT,
  palletMapping,
} from 'src/app/constants/app.constant';
import {
  IObject,
  IPalletPayload,
  Orientation,
  PalletType,
  States,
} from 'src/app/models/app.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit {
  idCounter = 0;
  palletWidth = 10; // simply initializing with some default value
  palletHeight = 10; // simply initializing with some default value
  objectMaxHeight = 0;
  objectMaxWidth = 0;
  state: States = 'INITIAL';
  palletMappings = palletMapping;
  objectsInPallet: IObject[] = [];
  palletType: PalletType = 'EURO 1';
  payload!: IPalletPayload | undefined;
  palletWidthMultiplicationFactor = 0.5; // simply initializing with some default value
  palletHeightMultiplicationFactor = 0.5; // simply initializing with some default value
  selectedObject: IObject | null = null;
  boundryDimensions: DOMRect | null = null;
  settingsPanelheight = SETTINGS_PANEL_HEIGHT;
  objectOrientation: Orientation = 'HORIZONTAL';
  palletContainerHeight = PALLET_CONTAINER_HEIGHT;
  selectedObjectForIndication: IObject | null = null;

  objectLengthControl = new FormControl<number>(1);
  objectWidthControl = new FormControl<number>(1);
  numberOfObjectsControl = new FormControl<number>(1);
  palletPlanningControl = new FormControl<boolean>(true);

  @ViewChild('palletArea') palletArea!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {}

  /**
   * The function `gotoNextPage()` is used to navigate between different states and perform certain
   * actions based on the current state.
   */
  gotoNextPage() {
    switch (this.state) {
      case 'INITIAL':
        this.state = 'MAIN';
        setTimeout(() => {
          this.selectPalletType('EURO 1');
        }, 200);
        break;
      case 'MAIN':
        this.saveObjects();
        this.state = 'FINISH';
        break;
      case 'FINISH':
        this.numberOfObjectsControl.patchValue(1);
        this.selectedObjectForIndication = null;
        this.objectsInPallet = [];
        this.payload = undefined;
        this.state = 'INITIAL';
        break;
      default:
        break;
    }
  }

  /**
   * The function "selectPalletType" sets the pallet type, calculates the pallet dimensions, and sets the
   * input range limits.
   * @param {PalletType} palletType - The `palletType` parameter is of type `PalletType`. It is used to
   * specify the type of pallet that will be selected.
   */
  selectPalletType(palletType: PalletType) {
    this.palletType = palletType;
    this.setPalletDimension();
    this.setInputRangeLimits();
  }

  /**
   * The function sets the input range limits for the object's width and length based on the pallet's
   * height and width.
   */
  private setInputRangeLimits() {
    this.objectWidthControl.patchValue(1);
    this.objectLengthControl.patchValue(1);
    this.objectMaxHeight = this.palletHeight;
    this.objectMaxWidth = this.palletWidth;
  }

  /**
   * The function calculates the dimensions of a pallet based on the dimensions of a pallet container and
   * a mapping of pallet types.
   */
  private setPalletDimension() {
    const pallet = this.getPalletDimensionMapping(this.palletType);
    const palletContainerWidth = this.palletArea.nativeElement!.offsetWidth;
    const palletContainerHeight = this.palletArea.nativeElement!.offsetHeight;
    const lengthRatio =
      Math.floor((palletContainerHeight / pallet.length) * 100) / 100;
    const widthRatio =
      Math.floor((palletContainerWidth / pallet.width) * 100) / 100;

    this.palletHeightMultiplicationFactor = Math.min(lengthRatio, widthRatio);
    this.palletWidthMultiplicationFactor = Math.min(lengthRatio, widthRatio);

    this.palletHeight = pallet.length * this.palletHeightMultiplicationFactor;
    this.palletWidth = pallet.width * this.palletWidthMultiplicationFactor;
  }

  /**
   * The savePalletSettings function updates the value of the palletPlanningControl to false.
   */
  savePalletSettings() {
    this.palletPlanningControl.patchValue(false);
  }

  /**
   * The function `getPalletDimensionMapping` returns the dimension mapping for a given pallet type.
   * @param {PalletType} pallet - PalletType
   * @returns the dimension mapping for the given pallet type.
   */
  getPalletDimensionMapping(pallet: PalletType) {
    return palletMapping[pallet];
  }

  addObject() {
    if (!this.objectWidthControl.value || !this.objectLengthControl.value) {
      return;
    }
    const isObjectDimensionIsGreaterThanPalletDimension =
      (this.objectOrientation === 'VERTICAL' &&
        (this.objectWidthControl.value > this.palletHeight ||
          this.objectLengthControl.value > this.palletWidth)) ||
      (this.objectOrientation === 'HORIZONTAL' &&
        (this.objectWidthControl.value > this.palletWidth ||
          this.objectLengthControl.value > this.palletHeight));

    if (isObjectDimensionIsGreaterThanPalletDimension) {
      alert(OBJECT_IS_BIGGER_THAN_PALLET);
      return;
    }
    if (this.isWithinBoundary()) {
      this.objectsInPallet.push({
        orientation: this.objectOrientation,
        itemNumber: this.objectsInPallet.length + 1,
        id: this.idCounter++,
      });
      // timeout is simply to make sure that the object is
      // rendered before attaching the drag listeners
      setTimeout(() => {
        this.attachDragListeners();
      }, 100);
    }
  }

  /**
   * The function attaches drag event listeners to the last object in the pallet.
   * @returns nothing (undefined) if the condition `if (!object)` is true.
   */
  attachDragListeners() {
    const lastObject = this.objectsInPallet[this.objectsInPallet.length - 1];

    const object = document.getElementById(OBJECT_ID_PREFIX + lastObject.id);
    if (!object) {
      return;
    }

    object.addEventListener('dragstart', (e) =>
      this.dragStartHandler(lastObject.id, e)
    );
    object.addEventListener('dragover', (e) =>
      this.dragOverHandler(lastObject.id, e)
    );
    object.addEventListener('drop', (e) => this.dropHandler(lastObject.id, e));
  }

  /**
   * The dragStartHandler function is used to handle the start of a drag event, setting the data to be
   * transferred and adding a class to the dragging element.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * object being dragged.
   * @param {any} e - The parameter `e` is an event object that contains information about the drag start
   * event. It can be used to access properties such as the target element, mouse coordinates, and other
   * relevant data related to the drag operation.
   */
  dragStartHandler(id: number, e: any) {
    let object = this.objectsInPallet.find((object) => object.id === id);
    e.dataTransfer?.setData('Text', object?.id.toString());

    // Add the identifying class to the dragging element
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
      draggingElement.classList.remove('dragging');
    }
    e.target.classList.add('dragging');
  }

  /**
   * The dragOverHandler function adds a class to the element being dragged over and removes the class
   * from any other element that was previously being dragged over.
   * @param {number} id - The id parameter is a number that represents the identifier of the element
   * being dragged over.
   * @param {any} e - The parameter "e" is an event object that represents the dragover event. It
   * contains information about the event, such as the target element being dragged over.
   */
  dragOverHandler(id: number, e: any) {
    e.preventDefault();
    // Add the identifying class to the element being dragged over
    const dragOverElement = document.querySelector('.drag-over');
    if (dragOverElement) {
      dragOverElement.classList.remove('drag-over');
    }
    e.target.classList.add('drag-over');
  }

  /**
   * The `dropHandler` function handles the dropping of objects by swapping the positions of the source
   * and target objects in the `objectsInPallet` array.
   * @param {number} targetObjectId - The targetObjectId parameter is the ID of the target object where
   * the dragged object will be dropped.
   * @param {any} e - The parameter `e` is an event object that represents the drag and drop event. It
   * contains information about the event, such as the data being dragged and dropped, the source and
   * target elements, and methods to interact with the event.
   */
  dropHandler(targetObjectId: number, e: any) {
    e.preventDefault();

    const sourceObjectId = e.dataTransfer?.getData('Text');
    const sourceObjectIndex = this.objectsInPallet.findIndex(
      (object) => object.id === parseInt(sourceObjectId || '', 10)
    );
    const targetIndex = this.objectsInPallet.findIndex(
      (object) => object.id === targetObjectId
    );

    if (sourceObjectIndex !== -1 && targetIndex !== -1) {
      [
        this.objectsInPallet[sourceObjectIndex],
        this.objectsInPallet[targetIndex],
      ] = [
        this.objectsInPallet[targetIndex],
        this.objectsInPallet[sourceObjectIndex],
      ];
    }

    const items = document.querySelectorAll('.object');
    items.forEach((item) => {
      item.classList.remove('dragging');
      item.classList.remove('drag-over');
    });
  }

  /**
   * The function "saveObjects" saves the objects, pallet type, number of objects, and object dimensions
   * into a payload object.
   */
  saveObjects() {
    if (
      this.numberOfObjectsControl.value &&
      this.objectLengthControl.value &&
      this.objectWidthControl.value
    ) {
      this.payload = {
        objects: this.getObjectsInPallet(),
        pallet: this.palletType,
        numberOfObjects: this.numberOfObjectsControl.value,
        objectDimension: this.getPalletDimensionMapping(this.palletType),
      };
    }
  }

  /**
   * The `removeObject` function removes the selected object from the `objectsInPallet` array.
   */
  removeObject() {
    if (this.selectedObject) {
      this.objectsInPallet = this.objectsInPallet.filter(
        (object) => object.id !== this.selectedObject?.id
      );
      this.selectedObject = null;
    }
  }

  /**
   * The `copyObject` function copies the selected object and adds it to the objects in the pallet.
   */
  copyObject() {
    if (this.selectedObject && this.isWithinBoundary()) {
      this.objectsInPallet.push({
        orientation: this.selectedObject.orientation,
        itemNumber: this.selectedObject.itemNumber,
        id: this.idCounter++,
      });
      setTimeout(() => {
        this.attachDragListeners();
      }, 100);
    }
  }

  /**
   * The function "selectObjectForModification" assigns the input object to the "selectedObject"
   * property.
   * @param {IObject} object - The parameter "object" is of type "IObject".
   */
  selectObjectForModification(object: IObject) {
    this.selectedObject = object;
  }

  /**
   * The function unSelectObject sets the selectedObject property to null.
   */
  unSelectObject() {
    this.selectedObject = null;
  }

  /**
   * The function checks if an object can fit within the boundaries of a pallet box.
   * @returns a boolean value. If the conditions inside the function are met, it will return `true`. If
   * the conditions are not met, it will display an alert message and return `false`.
   */
  private isWithinBoundary() {
    this.boundryDimensions = document
      .getElementById('palletBox')!
      .getBoundingClientRect();
    if (
      this.objectsInPallet.length > 0 &&
      this.objectLengthControl.value &&
      this.objectWidthControl.value
    ) {
      const lastObjectDimensions = document
        .getElementById(
          OBJECT_ID_PREFIX +
            this.objectsInPallet[this.objectsInPallet.length - 1].id
        )
        ?.getBoundingClientRect();

      // right side check is rquired, suppose the last line is going on
      // and it only checks with bottom then it will show false even if
      // there is space in right. so check botton only if there is no
      // space in right.
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
          this.boundryDimensions.bottom;

        if (isRightSideOverflow && isBottomSideOverflow) {
          alert(PALLET_IS_FULL);
          return false;
        }
      }
    }
    return true;
  }

  /**
   * The function `getObjectsInPallet` calculates the positions of objects on a pallet based on their
   * orientation and dimensions.
   * @returns an array of objects. Each object in the array has properties `x`, `y`, `id`, `itemNumber`,
   * and `orientation`.
   */
  getObjectsInPallet() {
    const palletLength = this.objectLengthControl.value;
    const palletWidth = this.objectWidthControl.value;
    const objects: IObject[] = [];

    this.objectsInPallet.map((object) => {
      const objectPositions = document
        .getElementById(OBJECT_ID_PREFIX + object.id)
        ?.getBoundingClientRect();
      if (objectPositions && palletLength && palletWidth) {
        const xDiff = objectPositions.x - this.boundryDimensions!.x;
        const yDiff = objectPositions.y - this.boundryDimensions!.y;
        const xPos =
          object.orientation === 'VERTICAL'
            ? xDiff + palletLength / 2
            : xDiff + palletWidth / 2;
        const yPos =
          object.orientation === 'VERTICAL'
            ? yDiff + palletWidth / 2
            : yDiff + palletLength / 2;

        const x = Math.floor(xPos / this.palletWidthMultiplicationFactor);
        const y = Math.floor(yPos / this.palletHeightMultiplicationFactor);

        objects.push({
          x,
          y,
          id: object.id,
          itemNumber: object.itemNumber,
          orientation: object.orientation,
        });
      }
    });
    return objects;
  }

  get remainingObjectsCount() {
    return this.numberOfObjectsControl.value! - this.objectsInPallet.length!;
  }

  // for final page
  /**
   * The function "selectObjectForIndication" assigns the input object to the
   * "selectedObjectForIndication" property.
   * @param {IObject} object - The parameter "object" is of type "IObject".
   */
  selectObjectForIndication(object: IObject) {
    this.selectedObjectForIndication = object;
  }
}
