import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import axios from '@config/axios/AxiosClient';
import { geocodeService } from '@config/gateway/config';
import { IGeometry } from '@modules/geolocation/domain/models/entities/IGeometry';
export class GeolocationsGateway implements IGeolocationsGateway {
  public async getGeometryFromAddress(
    address: string,
  ): Promise<IGeometry | undefined> {
    try {
      const { data, status } = await axios.get<any>(
        `${geocodeService.address}/json?address=${encodeURIComponent(
          address,
        )}&key=${geocodeService.key}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
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
