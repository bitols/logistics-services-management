import { GetLocationFromAddressUseCase } from '@modules/geolocation/useCases/GetLocationFromAddressUseCase';
import { UpdateReceiversLocationUseCase } from '@modules/receivers/useCases/UpdateReceiversLocationUseCase';
import { container } from 'tsyringe';

export const receiverLocation = async (message: string): Promise<void> => {
  try {
    const requestLocation = JSON.parse(message);

    const getLocationFromAddress = container.resolve(
      GetLocationFromAddressUseCase,
    );
    const updateReceiversLocation = container.resolve(
      UpdateReceiversLocationUseCase,
    );

    const location = await getLocationFromAddress.execute(
      requestLocation.address,
    );

    await updateReceiversLocation.execute({
      id: requestLocation.id,
      location,
    });
  } catch (error: any) {
    console.error(error.message);
  }
};
