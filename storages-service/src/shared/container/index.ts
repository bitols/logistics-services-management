import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { StoragesRepository } from '@modules/storages/infra/typeorm/repositories/StoragesRepository';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import { IKafkaQueue } from '@shared/infra/kafka/queue/IKafkaQueue';
import { container } from 'tsyringe';

container.registerSingleton<IStoragesRepository>(
  'StoragesRepository',
  StoragesRepository,
);

container.register<IKafkaQueue>('KafkaQueue', KafkaQueue);
