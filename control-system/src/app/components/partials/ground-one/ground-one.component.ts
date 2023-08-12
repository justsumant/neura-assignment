import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  CANNOT_MOVE_LEFT,
  CANNOT_MOVE_RIGHT,
  GROUND_HEIGHT,
  MAX_JEWEL_WEIGHT_LIMIT,
  NUMBER_OF_JEWELS,
  PIXEL_SIZE,
  PIXEL_TYPE,
} from 'src/app/constants/app.constant';
import {
  IJewel,
  IPanelSettings,
  IPixel,
  IPosition,
  PixelType,
} from 'src/app/models/app.model';

@Component({
  selector: 'app-ground-one',
  templateUrl: './ground-one.component.html',
  styleUrls: ['./ground-one.component.scss'],
})
export class GroundOneComponent implements OnInit, OnChanges, OnDestroy {
  centerPosition: IPosition = {
    x: 0,
    y: 0,
  };
  pixels: IPixel[] = [];
  numberOfColumns: number = 0;
  collectedJewels: IJewel[] = [];
  isGroundReady: boolean = false;
  isJewelDetailOn: boolean = false;
  pixelSize: number = PIXEL_SIZE;
  pixelType: PixelType = PIXEL_TYPE;
  groundHeight: number = GROUND_HEIGHT;
  numberOfJewels: number = NUMBER_OF_JEWELS;
  componentDestroyed$: Subject<boolean> = new Subject();
  rowSize: number = Math.floor(this.groundHeight / this.pixelSize);

  @Input() moveSubject!: Subject<any>;
  @Input() settings!: IPanelSettings;
  @ViewChild('ground') ground!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings'].currentValue) {
      this.resetGroundSettings();
    } else {
      this.collectedJewels = [];
      this.isGroundReady = false;
    }
  }

  ngOnInit(): void {
    this.moveSubject
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((e) => {
        switch (e) {
          case 'UP':
            this.moveUp();
            break;
          case 'DOWN':
            this.moveDown();
            break;
          case 'LEFT':
            this.moveLeft();
            break;
          case 'RIGHT':
            this.moveRight();
            break;
          case 'GRAB':
            this.grabJewel();
            break;
          default:
            break;
        }
      });
  }

  /**
   * The function resets the ground settings and prepares the ground for a new game.
   */
  resetGroundSettings() {
    this.pixels = [];
    this.collectedJewels = [];
    this.pixelType = this.settings.pixelType;
    this.pixelSize = this.settings.pixelSize;
    this.numberOfJewels = this.settings.numberOfJewels;
    this.rowSize = Math.floor(this.groundHeight / this.pixelSize);
    this.prepareGround();
  }

  /**
   * The function prepares the ground by calculating the number of columns based on the width of the
   * ground, initializing an array of pixels with specific properties, setting the center position, and
   * preparing random positions.
   */
  prepareGround() {
    let groundWidth = this.ground.nativeElement.clientWidth;
    this.numberOfColumns = Math.floor(groundWidth / this.pixelSize);
    for (let i = 0; i < this.numberOfColumns * this.rowSize; i++) {
      this.pixels.push({
        id: i,
        isSelected: false,
        hasJewel: false,
        hadJewel: false,
      });
    }

    this.centerPosition.x = Math.floor(this.numberOfColumns / 2);
    this.centerPosition.y = Math.floor(this.rowSize / 2);
    this.pixels[
      this.centerPosition.y * this.numberOfColumns + this.centerPosition.x
    ].isSelected = true;
    this.prepareRandomPositions();
    this.isGroundReady = true;
  }

  /**
   * The function prepares random positions for jewels on a grid.
   */
  prepareRandomPositions() {
    let jewelPositions: number[] = [];
    while (jewelPositions.length < this.numberOfJewels) {
      let randomPosition = Math.floor(Math.random() * this.pixels.length);
      if (
        randomPosition !==
          this.centerPosition.y * this.numberOfColumns +
            this.centerPosition.x &&
        !jewelPositions.includes(randomPosition)
      ) {
        jewelPositions.push(randomPosition);
        this.pixels[randomPosition].hasJewel = true;
        this.pixels[randomPosition].jewelWeight = Math.floor(
          Math.random() * MAX_JEWEL_WEIGHT_LIMIT
        );
      }
    }
  }

  /**
   * The `moveLeft` function moves the selected pixel to the left if possible, updates the selected
   * pixel, and collects any jewel on the current pixel.
   */
  moveLeft() {
    let currentPixelIndex = this.pixels.findIndex(
      (pixel) => pixel.isSelected === true
    );
    if (currentPixelIndex % this.numberOfColumns !== 0) {
      this.pixels[currentPixelIndex].isSelected = false;
      this.pixels[currentPixelIndex - 1].isSelected = true;
    } else if (currentPixelIndex % this.numberOfColumns === 0) {
      if (currentPixelIndex >= this.numberOfColumns) {
        this.pixels[currentPixelIndex].isSelected = false;
        this.pixels[currentPixelIndex - 1].isSelected = true;
      }
    } else if (currentPixelIndex === 0) {
      alert(CANNOT_MOVE_LEFT);
    }
    this.collectJewel(currentPixelIndex);
  }

  /**
   * The `moveRight` function moves the selected pixel one position to the right in a grid of pixels,
   * unless it is already at the rightmost position or at the bottom right corner.
   */
  moveRight() {
    let currentPixelIndex = this.pixels.findIndex(
      (pixel) => pixel.isSelected === true
    );
    if (currentPixelIndex % this.numberOfColumns !== this.numberOfColumns - 1) {
      this.pixels[currentPixelIndex].isSelected = false;
      this.pixels[currentPixelIndex + 1].isSelected = true;
    } else if (
      currentPixelIndex % this.numberOfColumns ===
      this.numberOfColumns - 1
    ) {
      if (currentPixelIndex < this.pixels.length - this.numberOfColumns) {
        this.pixels[currentPixelIndex].isSelected = false;
        this.pixels[currentPixelIndex + 1].isSelected = true;
      }
    } else if (currentPixelIndex === this.pixels.length - 1) {
      alert(CANNOT_MOVE_RIGHT);
    }
    this.collectJewel(currentPixelIndex);
  }

  /**
   * The `moveUp` function moves the selected pixel up by one row, updates the selected pixel, and
   * collects any jewels on the new pixel.
   */
  moveUp() {
    let currentPixelIndex = this.pixels.findIndex(
      (pixel) => pixel.isSelected === true
    );
    if (currentPixelIndex >= this.numberOfColumns) {
      this.pixels[currentPixelIndex].isSelected = false;
      this.pixels[currentPixelIndex - this.numberOfColumns].isSelected = true;
    }
    this.collectJewel(currentPixelIndex);
  }

  /**
   * The moveDown function moves the selected pixel down by one row and collects any jewels in the
   * process.
   */
  moveDown() {
    let currentPixelIndex = this.pixels.findIndex(
      (pixel) => pixel.isSelected === true
    );
    if (currentPixelIndex < this.pixels.length - this.numberOfColumns) {
      this.pixels[currentPixelIndex].isSelected = false;
      this.pixels[currentPixelIndex + this.numberOfColumns].isSelected = true;
    }
    this.collectJewel(currentPixelIndex);
  }

  /**
   * The function "grabJewel" checks if the currently selected pixel has a jewel, and if so, removes the
   * jewel from the pixel and adds it to the collectedJewels array.
   */
  grabJewel() {
    let currentPixelIndex = this.pixels.findIndex(
      (pixel) => pixel.isSelected === true
    );
    if (this.pixels[currentPixelIndex].hasJewel) {
      this.pixels[currentPixelIndex].hasJewel = false;
      this.pixels[currentPixelIndex].hadJewel = true;

      this.collectedJewels = [
        ...this.collectedJewels,
        {
          id: this.pixels[currentPixelIndex].id,
          x: (currentPixelIndex % this.numberOfColumns) + 1,
          y: Math.ceil(currentPixelIndex / this.numberOfColumns),
          weight: this.pixels[currentPixelIndex].jewelWeight!,
        },
      ];
    }
  }

  /**
   * The function collects a jewel from a pixel and adds it to the collected jewels array.
   * @param {number} currentPixelIndex - The currentPixelIndex parameter is a number that represents the
   * index of the pixel in an array of pixels.
   */
  collectJewel(currentPixelIndex: number) {
    if (this.pixels[currentPixelIndex].hasJewel) {
      this.pixels[currentPixelIndex].hasJewel = false;
      this.pixels[currentPixelIndex].hadJewel = true;
      this.collectedJewels = [
        ...this.collectedJewels,
        {
          id: this.pixels[currentPixelIndex].id,
          x: (currentPixelIndex % this.numberOfColumns) + 1,
          y: Math.ceil(currentPixelIndex / this.numberOfColumns),
          weight: this.pixels[currentPixelIndex].jewelWeight!,
        },
      ];
    }
  }

  /**
   * The function toggleJewelDetail toggles the value of the isJewelDetailOn variable.
   */
  toggleJewelDetail() {
    this.isJewelDetailOn = !this.isJewelDetailOn;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
