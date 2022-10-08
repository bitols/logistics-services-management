export class Storages {
  id?: string;
  name?: string;
  capacity?: number;
  email?: string;
  phone?: string;
  address?: string;
  supplierId?: string;
  senderId?: string;
  location?: {
    lat?: number;
    lng?: number;
  };
  supplier?: {
    id?: string;
    name?: string;
  }
}
