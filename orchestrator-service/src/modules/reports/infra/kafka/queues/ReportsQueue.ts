import kafkaConfig from '@config/kafkaConfig';
import { IReportsQueue } from '@modules/reports/domain/queues/IReportsQueue';
import { IGenerateStoragesCapacitysUseCase } from '@modules/reports/domain/useCases/IGenerateStoragesCapacityUseCase';
import GenerateStoragesCapacitysUseCase from '@modules/reports/useCases/GenerateStoragesCapacityUseCase';
import consumer from '@shared/infra/kafka';
import { container } from 'tsyringe';

export class ReportsQueue implements IReportsQueue {
  private generateStoragesCapacityUseCase: IGenerateStoragesCapacitysUseCase;
  constructor() {
    this.generateStoragesCapacityUseCase = container.resolve(
      GenerateStoragesCapacitysUseCase,
    );
  }

  public async consumeStoragesCapacity(): Promise<void> {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: kafkaConfig.storageControlTopic });
      await consumer.run({
        eachMessage: async ({ message }) => {
          if (message.value) {
            await this.generateStoragesCapacityUseCase.execute(
              JSON.parse(message.value.toString()),
            );
          }
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
