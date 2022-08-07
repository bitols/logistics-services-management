import { IGeometry } from '../models/entities/IGeometry';

export interface IGeolocationsRepository {
  getGeometryFromAddress(address: string): Promise<IGeometry | undefined>;
}
