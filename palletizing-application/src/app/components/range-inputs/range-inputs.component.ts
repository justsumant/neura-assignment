import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: '[app-range-inputs]',
  templateUrl: './range-inputs.component.html',
  styleUrls: ['./range-inputs.component.scss'],
})
export class RangeInputsComponent {
  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() min: number = 1;
  @Input() step: number = 10;
  @Input() max!: number;
  @Input() inputId!: string;

  get inputControl() {
    return this.control as FormControl<number>;
  }
}
