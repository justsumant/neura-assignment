import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: '[app-radio-group]',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
  @Input() label!: string;
  @Input() control!: AbstractControl;
  @Input() options: { label: string; id: string; value: string }[] = [];

  get inputControl() {
    return this.control as FormControl<string>;
  }
}
