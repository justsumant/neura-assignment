import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IJewel } from 'src/app/models/app.model';

@Component({
  selector: '[app-jewels-list]',
  templateUrl: './jewels-list.component.html',
  styleUrls: ['./jewels-list.component.scss'],
})
export class JewelsListComponent implements OnChanges {
  @Input() collectedJewels: IJewel[] = [];
  @Output() toggleJewelDetailOnEvent = new EventEmitter<void>();
  totalWeight: number = 0;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.totalWeight = 0;
    this.collectedJewels.forEach((jewel) => {
      this.totalWeight += jewel.weight;
    });
  }
}
