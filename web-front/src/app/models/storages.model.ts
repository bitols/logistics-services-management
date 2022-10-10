import { Locations } from "./locations.model";
import { Suppliers } from "./suppliers.model";

export class Storages {
  id?: string;
  name?: string;
  capacity?: number;
  email?: string;
  phone?: string;
  address?: string;
  supplierId?: string;
  senderId?: string;
  location?:  Locations;
  supplier?: Suppliers;
}
