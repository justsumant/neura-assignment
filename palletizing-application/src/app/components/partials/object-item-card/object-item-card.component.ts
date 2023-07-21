import { Component, Input } from '@angular/core';
import { IObject } from 'src/app/models/app.model';

@Component({
  selector: '[app-object-item-card]',
  templateUrl: './object-item-card.component.html',
  styleUrls: ['./object-item-card.component.scss'],
})
export class ObjectItemCardComponent {
  @Input() object!: IObject;
  @Input() index!: number;
}
