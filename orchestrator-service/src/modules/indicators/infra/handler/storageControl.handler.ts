import GenerateStoragesIndicatorsUseCase from '@modules/indicators/useCases/GenerateStoragesIndicatorsUseCase';
import { container } from 'tsyringe';

export const storageControl = async (message: string): Promise<void> => {
  console.log(`message received: ${message}`);

  const generateStoragesIndicators = container.resolve(
    GenerateStoragesIndicatorsUseCase,
  );

  await generateStoragesIndicators.execute(JSON.parse(message));
};
