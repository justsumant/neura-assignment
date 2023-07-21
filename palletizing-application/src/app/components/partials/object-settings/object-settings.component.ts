import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: '[app-object-settings]',
  templateUrl: './object-settings.component.html',
  styleUrls: ['./object-settings.component.scss'],
})
export class ObjectSettingsComponent {
  @Input() objectMaxHeight!: number;
  @Input() objectMaxWidth!: number;
  @Input() objectWidthControl!: AbstractControl;
  @Input() objectLengthControl!: AbstractControl;
  @Input() numberOfObjects!: AbstractControl;
  @Input() palletWidthMultiplicationFactor!: number;
  @Input() palletHeightMultiplicationFactor!: number;

  get numberOfObjectsControl() {
    return this.numberOfObjects as FormControl<number>;
  }

  get widthInMM() {
    return (
      Math.round(
        (this.objectWidthControl.value / this.palletWidthMultiplicationFactor) *
          100
      ) / 100
    );
  }

  get lengthInMM() {
    return (
      Math.round(
        (this.objectLengthControl.value /
          this.palletHeightMultiplicationFactor) *
          100
      ) / 100
    );
  }
}
