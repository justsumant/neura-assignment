import { Component } from '@angular/core';
import {
  IObject,
  IObjectDimension,
  IPalletPayload,
  PalletType,
  States,
} from './models/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  state: States = 'INITIAL';
  payload!: IPalletPayload;

  /**
   * The function "goToNextPage" updates the state and sets the payload based on the provided event
   * object.
   * @param event - The event parameter is an object that contains the following properties:
   */
  goToNextPage(event: {
    state: States;
    objects?: IObject[];
    pallet?: PalletType;
    numberOfObjects?: number;
    dimension?: IObjectDimension;
  }) {
    this.state = event.state;
    if (event.objects) {
      this.payload = {
        numberOfObjects: event.numberOfObjects,
        objectDimension: event.dimension,
        objects: event.objects,
        pallet: event.pallet,
      };
    }
  }
}
