import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PalletType } from 'src/app/models/app.model';

@Component({
  selector: 'app-pallet-type',
  templateUrl: './pallet-type.component.html',
  styleUrls: ['./pallet-type.component.scss'],
})
export class PalletTypeComponent {
  @Input() sellectedPallet!: PalletType;
  @Input() palletType!: string;
  @Output() palletTypeChangeEvent = new EventEmitter<PalletType>();

  selectPallet() {
    this.palletTypeChangeEvent.emit(this.palletType as PalletType);
  }
}
