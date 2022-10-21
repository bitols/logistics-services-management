import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentProduct: Products = {};

  message = '';

  constructor(
    private productsService: ProductsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.message = '';
      if(this.route.snapshot.params["id"]) {
        this.getProduct(this.route.snapshot.params["id"]);
      }

  }

  getProduct(id: string): void {
    this.productsService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve product`);
        }
      });
  }

  deleteProduct(): void {
    this.productsService.delete(this.currentProduct.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.notificationService.showSuccess('Product deleted');
          this.reloadPage();
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(e.error.message);
        }
      });
  }

  reloadPage(): void {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
