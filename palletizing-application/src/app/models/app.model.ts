export type States = 'INITIAL' | 'MAIN' | 'FINISH';
export type PalletType = 'EURO 1' | 'EURO 2' | 'EURO 3' | 'EURO 4';
export type Orientation = 'HORIZONTAL' | 'VERTICAL';

export interface IPalletPayload {
  pallet: string | undefined;
  objectDimension: IObjectDimension | undefined;
  numberOfObjects: number | undefined;
  objects: IObject[] | undefined;
}

export interface IObjectDimension {
  length: number;
  width: number;
}

export interface IObject {
  id: number;
  itemNumber: number;
  orientation?: Orientation;
  x?: number;
  y?: number;
}
