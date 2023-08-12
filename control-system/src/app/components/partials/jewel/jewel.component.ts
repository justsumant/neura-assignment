import { Component, Input } from '@angular/core';
import { IJewel } from 'src/app/models/app.model';

@Component({
  selector: 'app-jewel',
  templateUrl: './jewel.component.html',
  styleUrls: ['./jewel.component.scss'],
})
export class JewelComponent {
  @Input() jewel!: IJewel;
}
