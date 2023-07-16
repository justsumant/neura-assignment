import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPalletPayload, States } from 'src/app/models/app.model';

@Component({
  selector: '[app-finish-page]',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss'],
})
export class FinishPageComponent {
  @Output() gotoNextPageEvent = new EventEmitter<States>();
  @Input() payload!: IPalletPayload;

  goToNextPage() {
    this.gotoNextPageEvent.emit('INITIAL');
  }
}
