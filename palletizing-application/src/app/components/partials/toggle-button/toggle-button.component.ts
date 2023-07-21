import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: '[app-toggle-button]',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent {
  @Input() label!: string;
  @Input() inputId!: string;
  @Input() inputControl!: AbstractControl;

  get palletPlanningControl() {
    return this.inputControl as FormControl<boolean>;
  }
}
