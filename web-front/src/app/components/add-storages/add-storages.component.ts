import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storages } from 'src/app/models/storages.model';
import { Suppliers } from 'src/app/models/suppliers.model';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-add-storages',
  templateUrl: './add-storages.component.html',
  styleUrls: ['./add-storages.component.css']
})
export class AddStoragesComponent implements OnInit {
  storages: Storages = {};

  suppliers: Suppliers[] = [];
  currentSupplier: Suppliers = {};
  supplierName = '';

  isAddedIn = false;
  isAddedFailed = false;
  errorMessage = '';

  constructor(
    private suppliersService: SuppliersService,
    private storagesService: StoragesService,
    private sessionsService: SessionsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  onSubmit(): void {
    const data = {
      name: this.storages.name,
      email: this.storages.email,
      capacity: this.storages.capacity,
      phone: this.storages.phone,
      address: this.storages.address,
      senderId: this.sessionsService.getUser().senderId,
      supplierId: this.currentSupplier.id
    }

    this.storagesService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.isAddedIn = true;
          this.isAddedFailed = false;
        },
        error: (e: any) => {
          this.errorMessage = e.error.message;
          this.isAddedIn = false;
          this.isAddedFailed = true;
        }
      })
  }

  newStorages(): void {
    this.isAddedIn = false;
    this.storages = { };
    this.refreshList();

  }

  retrieveAllSuppliers(): void {
    this.suppliersService.getAll()
      .subscribe({
        next: (data) => {
          this.suppliers = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveSuppliersByName(): void {
    this.suppliersService.getAllByName(
      this.supplierName
    )
      .subscribe({
        next: (data) => {
          this.suppliers = data;
          },
        error: (e) => console.error(e)
      });
  }

  searchSuppliers(): void {
    if( this.supplierName ) {
      this.retrieveSuppliersByName();
    } else {
      this.retrieveAllSuppliers();
    }
  }

  refreshList(): void {
    this.searchSuppliers();
    this.currentSupplier = {};
  }

  backToList(): void {
    this.router.navigate(['/storages'])
  }
}
