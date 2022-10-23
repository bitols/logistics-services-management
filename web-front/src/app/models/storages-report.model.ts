export class StoragesReport {
  id?: string;
  storageId?: string;
  capacity?: number;
  stored?: number;
  usage?: number;
  value?: number;
  items?: number;
  senderId?: string;
  products?: ProductsStorageReport[];
}

export class ProductsStorageReport {
  id?: string;
  name?: string;
  stored?: number;
  usage?: number;
  value?: number;
  items?: number;
}
