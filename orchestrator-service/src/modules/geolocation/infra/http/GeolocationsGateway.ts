import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import axios from 'axios';
import gatewayConfig from '@config/gatewayConfig';
import { IGeometry } from '@modules/geolocation/domain/models/entities/IGeometry';

export class GeolocationsGateway implements IGeolocationsGateway {
  public async getGeometryFromAddress(
    address: string,
  ): Promise<IGeometry | undefined> {
    try {
      const { data, status } = await axios.get<any>(
        `${
          gatewayConfig.geocodeService.address
        }/json?address=${encodeURIComponent(address)}&key=${
          gatewayConfig.geocodeService.key
        }`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request location from address: ${address}, response status is: ${status}`,
      );

      return {
        bounds: {
          northeast: {
            lat: data.results[0].geometry.bounds.northeast.lat,
            lng: data.results[0].geometry.bounds.northeast.lng,
          },
          southwest: {
            lat: data.results[0].geometry.bounds.southwest.lat,
            lng: data.results[0].geometry.bounds.southwest.lng,
          },
        },
        location: {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        },
        type: data.results[0].geometry.location_type,
        viewport: {
          northeast: {
            lat: data.results[0].geometry.viewport.northeast.lat,
            lng: data.results[0].geometry.viewport.northeast.lng,
          },
          southwest: {
            lat: data.results[0].geometry.viewport.southwest.lat,
            lng: data.results[0].geometry.viewport.southwest.lng,
          },
        },
      };
    } catch (error: any) {
      console.error(error);
    }
  }
}
