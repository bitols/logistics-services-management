import { IGeometry } from '../models/entities/IGeometry';

export interface IGeolocationsGateway {
  getGeometryFromAddress(address: string): Promise<IGeometry | undefined>;
}
