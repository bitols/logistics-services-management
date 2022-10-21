import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/models/products.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';

@Component({
  selector: 'app-add-storages-products',
  templateUrl: './add-storages-products.component.html',
  styleUrls: ['./add-storages-products.component.css']
})
export class AddStoragesProductsComponent implements OnInit {
  @Input() storagesId?: number;

  currentQuantity?: number = undefined;

  products: Products[] = [];
  currentProduct: Products = {};

  constructor(
    public activeModal: NgbActiveModal,
    private productsService: ProductsService,
    private storagesService: StoragesService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService
    ) { }
  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.productsService.getAll(this.sessionsService.getUser().senderId)
    .subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => {
        console.error(e),
        this.notificationService.showError(`Problem to retrieve products`);
      }
    });
  }

  onSubmit(): void {
    const id = this.storagesId;
    const data = {
      productId: this.currentProduct.id,
      quantity: this.currentQuantity,
    }
    this.storagesService.addStoragesProducts(id,data)
    .subscribe({
      next: (res: any) => {
        this.notificationService.showSuccess('Products registred on Storage');
        this.activeModal.close('Close click');
      },
      error: (e: any) => {
        this.notificationService.showError(e.error.message);
      }
    })
  }
}
