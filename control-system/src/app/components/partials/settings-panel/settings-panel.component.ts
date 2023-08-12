import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MAX_NO_OF_JEWELS,
  MIN_NO_OF_JEWELS,
  NUMBER_OF_JEWELS,
  PIXEL_SIZE,
  PIXEL_SIZE_MAX_VALUE,
  PIXEL_SIZE_MIN_VALUE,
  PIXEL_TYPE_OPTIONS,
  ROUND,
} from 'src/app/constants/app.constant';
import {
  IPanelSettings,
  IPixelType,
  MoveActionType,
  PixelType,
} from 'src/app/models/app.model';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
})
export class SettingsPanelComponent implements OnInit {
  disableSettings = false;
  settings!: IPanelSettings;
  noOfJewelsMin = MIN_NO_OF_JEWELS;
  noOfJewelsMax = MAX_NO_OF_JEWELS;
  pixelSizeMin = PIXEL_SIZE_MIN_VALUE;
  pixelSizeMax = PIXEL_SIZE_MAX_VALUE;
  pixelTypeOptions: IPixelType[] = PIXEL_TYPE_OPTIONS;
  pixelTypeControl = new FormControl<PixelType>(ROUND);
  pixelSizeControl = new FormControl<number>(PIXEL_SIZE);
  noOfJewelsControl = new FormControl<number>(NUMBER_OF_JEWELS);

  @ViewChild('upButton') upButton: ElementRef | undefined;
  @ViewChild('downButton') downButton: ElementRef | undefined;
  @ViewChild('leftButton') leftButton: ElementRef | undefined;
  @ViewChild('rightButton') rightButton: ElementRef | undefined;
  @ViewChild('applyButton') applyButton: ElementRef | undefined;

  @Output() settingsEvent = new EventEmitter<IPanelSettings>();
  @Output() moveActionEvent = new EventEmitter<MoveActionType>();

  ngOnInit(): void {
    this.subscribeToKeyEvents();
  }

  /**
   * The function `subscribeToKeyEvents` listens for keydown events and triggers different actions based
   * on the key code.
   */
  subscribeToKeyEvents() {
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode === 38) {
        this.move('UP');
      } else if (e.keyCode === 40) {
        this.move('DOWN');
      } else if (e.keyCode === 37) {
        this.move('LEFT');
      } else if (e.keyCode === 39) {
        this.move('RIGHT');
      } else if (e.keyCode === 13) {
        this.clearButtonFocuses();
        this.move('GRAB');
      }
    };
  }

  /**
   * The function clears the focus from four buttons.
   */
  clearButtonFocuses() {
    this.upButton?.nativeElement.blur();
    this.downButton?.nativeElement.blur();
    this.leftButton?.nativeElement.blur();
    this.rightButton?.nativeElement.blur();
  }

  /**
   * The move function emits a move action event if the settings are not disabled.
   * @param {MoveActionType} action - MoveActionType - a type that represents different types of move
   * actions. It could be an enum or a string with predefined values such as "up", "down", "left",
   * "right", etc.
   */
  move(action: MoveActionType) {
    if (this.disableSettings) {
      this.moveActionEvent.emit(action);
    }
  }

  /**
   * The `applySettings` function updates the settings based on user input, disables further changes to
   * the settings, and emits an event with the updated settings.
   */
  applySettings() {
    // remove focus from apply button
    this.applyButton?.nativeElement.blur();

    if (this.pixelSizeControl.value! < PIXEL_SIZE_MIN_VALUE) {
      this.pixelSizeControl.setValue(PIXEL_SIZE_MIN_VALUE);
    } else if (this.pixelSizeControl.value! > PIXEL_SIZE_MAX_VALUE) {
      this.pixelSizeControl.setValue(PIXEL_SIZE_MAX_VALUE);
    }
    if (this.noOfJewelsControl.value! < MIN_NO_OF_JEWELS) {
      this.noOfJewelsControl.setValue(MIN_NO_OF_JEWELS);
    } else if (this.noOfJewelsControl.value! > MAX_NO_OF_JEWELS) {
      this.noOfJewelsControl.setValue(MAX_NO_OF_JEWELS);
    }
    this.settings = {
      pixelType: this.pixelTypeControl.value!,
      pixelSize: this.pixelSizeControl.value!,
      numberOfJewels: this.noOfJewelsControl.value!,
    };
    this.disableSettings = true;
    this.settingsEvent.emit(this.settings);
  }

  resetSettings() {
    this.pixelTypeControl.setValue(ROUND);
    this.pixelSizeControl.setValue(PIXEL_SIZE);
    this.noOfJewelsControl.setValue(NUMBER_OF_JEWELS);
    this.settingsEvent.emit(undefined);
    this.disableSettings = false;
  }
}
