import { IGeolocationsRepository } from '@modules/geolocation/domain/repositories/IGeolocationsRepository';
import rest from '@config/rest';
import { geocodeService } from '@config/rest/config';
import { IGeometry } from '@modules/geolocation/domain/models/entities/IGeometry';
export class GeolocationsRepository implements IGeolocationsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(geocodeService.address);
  }

  public async getGeometryFromAddress(
    address: string,
  ): Promise<IGeometry | undefined> {
    try {
      const { data, status } = await this.restClient.get<any>(
        `/json?address=${encodeURIComponent(address)}&key=${
          geocodeService.key
        }`,
      );
      console.log(
        `request location from address: ${address}, response status is: ${status}`,
      );
      if (data.results.length) {
        return data.results[0].geometry;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
