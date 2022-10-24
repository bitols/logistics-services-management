import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Storages } from 'src/app/models/storages.model';
import { Suppliers } from 'src/app/models/suppliers.model';
import { NotificationService } from 'src/app/services/notification.service';
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

  errorMessage = '';

  constructor(
    public activeModal: NgbActiveModal,
    private suppliersService: SuppliersService,
    private storagesService: StoragesService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
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
          this.notificationService.showSuccess('Storage registred');
          this.activeModal.close('Success');
        },
        error: (e: any) => {
          this.errorMessage = e.error.message;
          this.notificationService.showError(e.error.message);
          this.activeModal.close('Error');
        }
      })
  }

  newStorages(): void {
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
}
