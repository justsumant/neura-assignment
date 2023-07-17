import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: '[app-range-inputs]',
  templateUrl: './range-inputs.component.html',
})
export class RangeInputsComponent {
  @Input() label!: string;
  @Input() min: number = 1;
  @Input() step: number = 10;
  @Input() max!: number;
  @Input() inputId!: string;
  @Input() control!: AbstractControl;

  get inputControl() {
    return this.control as FormControl<number>;
  }
}
