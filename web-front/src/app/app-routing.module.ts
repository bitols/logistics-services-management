import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { AddProductsComponent } from './components/add-products/add-products.component';

import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';
import { StoragesListComponent } from './components/storages-list/storages-list.component';
import { StoragesDetailsComponent } from './components/storages-details/storages-details.component';
import { AddStoragesComponent } from './components/add-storages/add-storages.component';
import { StoragesManagerComponent } from './components/storages-manager/storages-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductsDetailsComponent },
  { path: 'add-products', component: AddProductsComponent },
  { path: 'storages', component: StoragesListComponent },
  { path: 'storages/:id', component: StoragesDetailsComponent },
  { path: 'add-storages', component: AddStoragesComponent },
  { path: 'storages-manager', component: StoragesManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
