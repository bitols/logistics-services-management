import { IBounds } from './IBounds';
import { ILocation } from './ILocation';
import { IViewPort } from './IViewPort';

export interface IGeometry {
  bounds: IBounds;
  location: ILocation;
  type: string;
  viewport: IViewPort;
}
