import { IObjectDimension, PalletType } from '../models/app.model';

export const palletMapping: { [key in PalletType]: IObjectDimension } = {
  'EURO 1': {
    length: 1200,
    width: 800,
  },
  'EURO 2': {
    length: 1000,
    width: 1200,
  },
  'EURO 3': {
    length: 1200,
    width: 1000,
  },
  'EURO 4': {
    length: 600,
    width: 800,
  },
};

// maintaining a 200px of height difference between settings
// panel height and pallet container height is most suitable for the UI
export const SETTINGS_PANEL_HEIGHT = 750;
export const PALLET_CONTAINER_HEIGHT = 550;

//  string constants
export const OBJECT_IS_BIGGER_THAN_PALLET = 'Object is bigger than pallet';
export const OBJECT_ID_PREFIX = 'object-';
export const PALLET_IS_FULL = 'Pallet is full';
