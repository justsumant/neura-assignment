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
  selector: '[app-jewel-summary]',
  templateUrl: './jewel-summary.component.html',
  styleUrls: ['./jewel-summary.component.scss'],
})
export class JewelSummaryComponent implements OnChanges {
  totalWeight: number = 0;
  @Input() collectedJewels: IJewel[] = [];
  @Output() toggleJewelDetailOnEvent = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    this.totalWeight = 0;
    this.collectedJewels.forEach((jewel) => {
      this.totalWeight += jewel.weight;
    });
  }
}
