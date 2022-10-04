import { Component, OnInit } from '@angular/core';
import { Router, RouterConfigOptions } from '@angular/router';
import { Products } from 'src/app/models/products.model';
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
  isAddFailed = false;
  errorMessage = '';


  constructor(
    private productsService: ProductsService,
    private sessionsService: SessionsService,
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
          console.log(res);
          this.isAddedIn = true;

        },
        error: (e: any) => {
          this.errorMessage = e.error.message;
          this.isAddFailed = true;
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

  reloadPage(): void {
    window.location.reload();
  }
}
