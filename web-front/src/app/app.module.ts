import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddProductsComponent } from './components/add-products/add-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './helpers/http.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    AddProductsComponent,
    ProductsDetailsComponent,
    ProductsListComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
