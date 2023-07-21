import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Orientation } from 'src/app/models/app.model';

@Component({
  selector: '[app-add-object-button-group]',
  templateUrl: './add-object-button-group.component.html',
  styleUrls: ['./add-object-button-group.component.scss'],
})
export class AddObjectButtonGroupComponent {
  @Input() objectOrientation!: Orientation;
  @Output() addObjectEvent = new EventEmitter<void>();
  @Output() changeObjectOrientationEvent = new EventEmitter<Orientation>();
}
