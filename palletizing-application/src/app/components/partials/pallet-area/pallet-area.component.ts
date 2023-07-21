import { IObject, States } from 'src/app/models/app.model';
import { AbstractControl, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: '[app-pallet-area]',
  templateUrl: './pallet-area.component.html',
  styleUrls: ['./pallet-area.component.scss'],
})
export class PalletAreaComponent {
  @Input() state: States = 'INITIAL';
  @Input() objectsInPallet: IObject[] = [];
  @Input() objectWidth!: AbstractControl;
  @Input() objectLength!: AbstractControl;
  @Input() selectedObject!: IObject | null;
  @Output() selectObjectEvent = new EventEmitter<IObject>();

  get objectWidthControl() {
    return this.objectWidth as FormControl<number>;
  }

  get objectLengthControl() {
    return this.objectLength as FormControl<number>;
  }
}
