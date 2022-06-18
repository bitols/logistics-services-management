import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import axios from 'axios';

export class GeolocationsGateway implements IGeolocationsGateway {
  public async getLocationFromAddress(address: string): Promise<any> {
    try {
      const { data, status } = await axios.get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=AIzaSyC80nZOa8AEJWJE3V0B2TFStXifu13YuaA`,
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
