import { GetLocationFromAddressUseCase } from '@modules/geolocation/useCases/GetLocationFromAddressUseCase';
import { UpdateReceiversLocationUseCase } from '@modules/receivers/useCases/UpdateReceiversLocationUseCase';
import { container } from 'tsyringe';

export const receiverLocation = async (message: string): Promise<void> => {
  try {
    console.log(`receiverLocation message received: ${message}`);

    const getLocationFromAddress = container.resolve(
      GetLocationFromAddressUseCase,
    );
    const updateReceiversLocation = container.resolve(
      UpdateReceiversLocationUseCase,
    );

    const parsedMessage = JSON.parse(message);
    const location = await getLocationFromAddress.execute(
      parsedMessage.address,
    );

    await updateReceiversLocation.execute({
      id: parsedMessage.id,
      location,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
