import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/models/products.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { StoragesService } from 'src/app/services/storages.service';

@Component({
  selector: 'app-rmv-storages-products',
  templateUrl: './rmv-storages-products.component.html',
  styleUrls: ['./rmv-storages-products.component.css']
})
export class RmvStoragesProductsComponent implements OnInit {
  @Input() storagesId?: number;
  @Input() products?: Products[];

  currentProduct: Products = {};
  currentQuantity?: number = undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private storagesService: StoragesService,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
   const id = this.storagesId;
    const productId = this.currentProduct.id;
    const data = {
      quantity: this.currentQuantity,
    }
    this.storagesService.rmvStoragesProducts(id, productId, data)
    .subscribe({
      next: (res: any) => {
        this.notificationService.showSuccess('Products removed from Storage');
        this.activeModal.close('Close click');
      },
      error: (e: any) => {
        this.notificationService.showError(e.error.message);
      }
    })
  }

}
