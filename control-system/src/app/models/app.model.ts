export interface IPosition {
  x: number;
  y: number;
}
export interface IPixel {
  id: number;
  isSelected: boolean;
  hasJewel: boolean;
  hadJewel: boolean;
  jewelWeight?: number;
}

export interface IJewel {
  id: number;
  x: number;
  y: number;
  weight: number;
}

export type PixelType = 'round' | 'square';

export interface ISettings {
  groundHeight: number;
  numberOfColumns: number;
  numberOfJewels: number;
  centerPosition: IPosition;
  panelSettings: IPanelSettings;
}

export interface IPanelSettings {
  pixelType: PixelType;
  pixelSize: number;
  numberOfJewels: number;
}

export interface IPixelType {
  label: string;
  id: string;
  value: string;
}

export type MoveActionType = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP' | 'GRAB';
