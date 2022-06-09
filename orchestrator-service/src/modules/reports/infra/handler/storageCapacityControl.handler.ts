import GenerateStoragesCapacitysUseCase from '@modules/reports/useCases/GenerateStoragesCapacityUseCase';
import { container } from 'tsyringe';

export const storageCapacityControl = async (
  message: string,
): Promise<void> => {
  console.log(`storageCapacityControl message received: ${message}`);

  const generateStoragesIndicators = container.resolve(
    GenerateStoragesCapacitysUseCase,
  );

  await generateStoragesIndicators.execute(JSON.parse(message));
};
