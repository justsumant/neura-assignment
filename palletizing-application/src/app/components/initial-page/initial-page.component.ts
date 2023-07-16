import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: '[app-initial-page]',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss'],
})
export class InitialPageComponent {
  @Output() gotoNextPageEvent = new EventEmitter<void>();

  goToNextPage() {
    this.gotoNextPageEvent.emit();
  }
}
