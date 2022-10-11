import { Component, OnInit } from '@angular/core';
import { Router, RouterConfigOptions } from '@angular/router';
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

  isAddedIn = false;
  isAddedFailed = false;
  errorMessage = '';


  constructor(
    private productsService: ProductsService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
    private router: Router,
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
          this.notificationService.showSuccess('Product registred','Success');
          this.isAddedIn = true;
          this.isAddedFailed = false;
          this.backToList();
        },
        error: (e: any) => {
          console.error(`error: ${e}`);
          this.notificationService.showError(e.error.message,'Fail');
          this.errorMessage = e.error.message;
          this.isAddedIn = false;
          this.isAddedFailed = true;
        }
      })
  }

  newProducts(): void {
    this.isAddedIn = false;
    this.products = { };
  }

  backToList(): void {
    this.router.navigate(['/products'])
  }

}
