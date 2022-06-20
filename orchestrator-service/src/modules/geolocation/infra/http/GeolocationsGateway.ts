import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import axios from 'axios';
import gatewayConfig from '@config/gatewayConfig';

export class GeolocationsGateway implements IGeolocationsGateway {
  public async getLocationFromAddress(address: string): Promise<any> {
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

      return data;
    } catch (error: any) {
      console.error(error);
    }
  }
}
