import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddProductsComponent } from './components/add-products/add-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';

import { httpInterceptorProviders } from './helpers/http.interceptor'

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AddStoragesComponent } from './components/add-storages/add-storages.component';
import { StoragesDetailsComponent } from './components/storages-details/storages-details.component';
import { StoragesListComponent } from './components/storages-list/storages-list.component';
import { StoragesManagerComponent } from './components/storages-manager/storages-manager.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    AddProductsComponent,
    ProductsDetailsComponent,
    ProductsListComponent,
    LoginComponent,
    HomeComponent,
    AddStoragesComponent,
    StoragesDetailsComponent,
    StoragesListComponent,
    StoragesManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
