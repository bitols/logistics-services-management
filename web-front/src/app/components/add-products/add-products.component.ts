import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  products: Products = {
    name: '',
    height: 0,
    width: 0,
    lenght: 0,
    price: 0,
    senderId: ''
  }

  submitted = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  saveProducts(): void {
    const data = {
      name: this.products.name,
      height: this.products.height,
      width: this.products.width,
      lenght: this.products.height,
      price: this.products.price,
      senderId: this.products.senderId
    }

    this.productsService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      })
  }

  newProducts(): void {
    this.submitted = false;
    this.products = {
      name: '',
      height: 0,
      width: 0,
      lenght: 0,
      price: 0,
      senderId: ''
    };
  }
}
