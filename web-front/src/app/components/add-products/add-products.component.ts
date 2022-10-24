import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/models/products.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { SessionsService } from 'src/app/services/sessions.service';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  products: Products = { }

  constructor(
    public activeModal: NgbActiveModal,
    private productsService: ProductsService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const data = {
      name: this.products.name,
      height: this.products.height,
      width: this.products.width,
      lenght: this.products.height,
      price: this.products.price,
      senderId: this.sessionsService.getUser().senderId
    }
    this.productsService.create(data)
      .subscribe({
        next: (res: any) => {
          this.notificationService.showSuccess('Product registred');
          this.activeModal.close('Close click');
        },
        error: (e: any) => {
          console.error(`error: ${e}`);
          this.notificationService.showError(e.error.message);
           this.activeModal.close('Close click');
        }
      })
  }

}
