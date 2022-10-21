import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { SessionsService } from 'src/app/services/sessions.service';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Products[] = [];
  currentProduct: Products = {};
  currentIndex = -1;
  name = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(
    private productsService: ProductsService,
    private sessionsService: SessionsService,
    private notificationService: NotificationService,
    private router: Router
    ) { }


  ngOnInit(): void {
    this.refreshList();
  }


  searchProducts(): void {
    if( this.name ) {
      this.retrieveProductsByName();
    } else {
      this.retrieveAllProducts();
    }

  }

  retrieveAllProducts(): void {
    this.productsService.getAll(this.sessionsService.getUser().senderId)
      .subscribe({
        next: (data) => {
          this.products = data;
          this.count = data.length;
        },
        error: (e) => {
          console.error(e),
          this.notificationService.showError(`Problem to retrieve products`);
        }
      });
  }

  retrieveProductsByName(): void {
    this.productsService.getAllByName(
      this.sessionsService.getUser().senderId,
      this.name
    )
      .subscribe({
        next: (data) => {
          this.products = data;
          this.count = data.length;
        },
        error: (e) => {
          console.error(e);
          this.notificationService.showError(`Problem to retrieve products`);
        }
      });
  }

  refreshList(): void {
    this.searchProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Products, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
   }

  handlePageChange(event: number): void {
    this.page = event;
  }

  addProducts(): void {
    this.router.navigate(['/add-products'])
  }


}
