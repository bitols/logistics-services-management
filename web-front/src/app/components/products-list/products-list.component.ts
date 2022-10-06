import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products.model';
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
    private router: Router
    ) { }


  ngOnInit(): void {
    this.searchProducts();
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
        error: (e) => console.error(e)
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
        error: (e) => console.error(e)
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
    console.log(`teste index: ${this.currentIndex}`)
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

  reloadPage(): void {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
